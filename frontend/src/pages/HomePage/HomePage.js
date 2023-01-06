import React from 'react';
import { useState, useEffect, useRef } from 'react';
import style from './style.css';
import * as api from '../../api/index.js'

import Module from '../../components/Module/Module';
import CreateModule from '../../components/CreateModule/CreateModule';
import Auth from '../../components/Auth/Auth';

function HomePage() {
    const [create, setCreate] = useState(false);
    const [selected, setSelected] = useState();
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [user, setUser] = useState();

    // Temporary state to store modules
    const [modules, setModules] = useState([]);

    useEffect(() => {
        if (!user) {
            setUser(JSON.parse(localStorage.getItem('profile')))
        }

        if (localStorage.getItem('token')) {
            setIsSignedIn(true);
        }

        if (isSignedIn)
            getModules(user);
        
    }, [user])

    const handleCreate = () => {
        setCreate(!create);
    }

    const setUserData = (user) => {
        setUser(user);
        setIsSignedIn(true);
    } 

    const addModule = (data) => {
        setModules(modules => [...modules, data]);
        setCreate(!create);
    }

    const handleModuleClick = (id) => {
        let mod = modules.find(element => element._id == id);
        modules.map(item => {
            if (item == mod) {
                item.selected = true;
                return item;
            } else {
                item.selected = false;
                return item;
            }
        })
        setSelected(mod);  
    }

    const deleteModule = async (id) => {
        try {
            const { data } = await api.deleteModule(id);

            setSelected(null);
            getModules(user);
            console.log(modules);
        } catch (error) {
            console.log(error)
        }        
    }

    const showUserInfo = () => {
        console.log(isSignedIn);
        console.log(user);
    }
    
    const logout = () => {
        setIsSignedIn(false);
        setModules([]);
        setUser(null);
        localStorage.clear();
    }

    const getModules = async (user) => {
        try {
            const { data } = await api.getModules(user._id);

            setModules(data);      
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            { !isSignedIn ?
                <Auth setUserData={setUserData}></Auth>
            :
                <>
                    <div>
                        <h1>Home Page</h1>
                    </div>
                    { create ?
                        <>
                            <CreateModule user={user} addModule={addModule}></CreateModule>
                            <button onClick={handleCreate}>Cancel</button>
                        </>                
                    :
                        <>
                            <button onClick={handleCreate}>Create</button>
                        </>
                    }            
                    <div>
                        { (modules.length > 0) ? 
                            <ul className="module-list">
                                {modules.map(module => (
                                    <li key={module._id}>
                                        <Module username={user.username} handleModuleClick={() => handleModuleClick(module._id)} module={module} deleteModule={deleteModule} selected={module.selected}></Module>
                                    </li>                                    
                                ))}
                            </ul>
                        :
                            <>
                                No Modules
                            </>
                        }                
                    </div>
                    <div>
                        { selected ?
                            <p>{selected.text}</p>
                        :
                            <>Select a Module</>
                        }                
                    </div>    
                </>
            }
            <button onClick={() => {console.log(user)}}>Show User</button>
            <button onClick={() => {setIsSignedIn(!isSignedIn)}}>Toggle Auth</button>   
            <button onClick={() => {console.log(modules)}}>Show Modules</button>
            <button onClick={showUserInfo}>Show User</button>  
            { isSignedIn ? <button onClick={logout}>Logout</button> : null }       
        </div>        
    )
}

export default HomePage
