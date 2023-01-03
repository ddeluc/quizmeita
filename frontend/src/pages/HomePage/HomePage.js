import React from 'react';
import { useState, useEffect } from 'react';
import style from './style.css';
import * as api from '../../api/index.js'

import Module from '../../components/Module/Module';
import CreateModule from '../../components/CreateModule/CreateModule';

function HomePage() {
    const [create, setCreate] = useState(false);
    const [selected, setSelected] = useState();

    // Temporary state to store modules
    const [modules, setModules] = useState([]);

    useEffect(() => {
        getModules();
    }, [])

    const handleCreate = () => {
        setCreate(!create);
    }

    const addModule = (data) => {
        setModules(modules => [...modules, data]);
        setCreate(!create);
    }

    const handleModuleClick = (name) => {
        let mod = modules.find(element => element.title == name);
        modules.map(item => {
            if (item == mod) {
                item.selected = true;
                return item;
            } else {
                item.selected = false;
                return item;
            }
        })
        let modupdate = modules.find(element => element.name == name);
        setSelected(mod);  
    }

    const getModules = async () => {
        try {
            const { data } = await api.getModules();

            if (data.length > 0) {
                setModules(data)
                console.log(modules);
            }            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div>
                <h1>Home Page</h1>
            </div>
            { create ?
                <div>
                    <CreateModule addModule = {addModule}></CreateModule>
                    <button onClick={handleCreate}>Cancel</button>
                </div>                
            :
                <div>
                    <button onClick={handleCreate}>Create</button>
                </div>
            }            
            <div>
                { (modules.length > 0) ? 
                    <ul className="module-list">
                        {modules.map(module => (
                            <li key={module._id}>
                                <Module handleModuleClick={() => handleModuleClick(module.title)} module={module} selected={module.selected}></Module>
                            </li>                        
                        ))}
                    </ul>
                :
                    <div>
                        No Modules
                    </div>
                }                
                </div>
            <div>
                { selected ?
                    <p>{selected.text}</p>
                :
                    null
                }                
            </div>
            <div>
                <button onClick={getModules}>Get Modules</button>
            </div>         
        </div>
        
    )
}

export default HomePage
