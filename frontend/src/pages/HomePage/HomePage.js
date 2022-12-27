import React from 'react';
import { useState } from 'react';
import style from './style.css';

import Module from '../../components/Module/Module';
import CreateModule from '../../components/CreateModule/CreateModule';

function HomePage() {
    const [create, setCreate] = useState(false);
    const [selected, setSelected] = useState();

    // Temporary state to store modules
    const [modules, setModules] = useState([]);

    const handleCreate = () => {
        setCreate(!create);
    }

    const addModule = (text) => {
        setModules(modules => [...modules, {name: modules.length + 1, text: text, selected: false}]);
        setCreate(!create);
    }

    const handleModuleClick = (name) => {
        let mod = modules.find(element => element.name == name);
        modules.map(item => {
            if (item == mod) {
                console.log(item);
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
                <ul className="module-list">
                    {modules.map(module => (
                        <li key={module.name}>
                            <Module handleModuleClick={handleModuleClick} name={module.name} selected={module.selected}></Module>
                        </li>                        
                    ))}
                </ul>
            </div>
            <div>
                { selected ?
                    <p>{selected.text}</p>
                :
                    null
                }                
            </div>          
        </div>
        
    )
}

export default HomePage
