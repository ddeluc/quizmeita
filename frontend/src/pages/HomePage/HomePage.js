import React from 'react';
import { useState, useEffect, useRef } from 'react';
import style from './style.css';
import * as api from '../../api/index.js'

import Module from '../../components/Module/Module';
import CreateModule from '../../components/CreateModule/CreateModule';
import Auth from '../../components/Auth/Auth';
import Navbar from '../../components/Navbar/Navbar';

function HomePage({ userData }) {
    const [create, setCreate] = useState(false);
    const [selected, setSelected] = useState();
    const [modules, setModules] = useState([]);

    useEffect(() => {
        getModules(userData);        
    }, [])

    const handleCreate = () => {
        setCreate(!create);
    }

    const addModule = (data, example) => {
        setModules(modules => [...modules, data]);
        if (!example)
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
            getModules(userData);
            console.log(modules);
        } catch (error) {
            console.log(error)
        }        
    }

    const buildModule = async () => {
        try {
            const { data } = await api.createModule({title: "Example", text: "", author: userData.username});
            addModule(data, true);

            console.log(data);
        } catch (error) {
            console.log(error)
        }        
    }

    const getModules = async (user) => {
        try {
            const { data } = await api.getModules(userData._id);

            setModules(data);      
        } catch (error) {
            console.log(error);
        }
    }

    return (        
        <div>
                <>
                    <div>
                        <h1>Home Page</h1>
                    </div>
                    { create ?
                        <>
                            <CreateModule user={userData} addModule={addModule}></CreateModule>
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
                                        <Module username={userData.username} handleModuleClick={() => handleModuleClick(module._id)} module={module} deleteModule={deleteModule} selected={module.selected}></Module>
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
                            <>Select a module to display its contents.</>
                        }
                        { modules.length == 0 ?
                            <>
                                <p>
                                    If you are new and don't have any modules yet, click the button
                                    "Example" button below for a pre-built module! 
                                </p>
                                <button onClick={buildModule}>Example</button>
                            </>
                            
                        :
                            null
                        }                
                    </div>    
                </>
            
        </div>        
    )
}

export default HomePage
