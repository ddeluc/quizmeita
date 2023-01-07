import mongoose from "mongoose";
import Module from "../models/module.js";
import User from "../models/user.js";

export const getModules = async (req, res) => {
    const { userId } = req.params;
    const modules = [];

    try {
        const user = await User.findOne({ _id: userId});
        const userModuleArray = user.modules;

        for (let i = 0; i < userModuleArray.length; i++) {
            const module = await Module.findOne({ _id: userModuleArray[i] })
            modules.push(module);
        }

        res.status(200).json(modules);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteModule = async (req, res) => {
    const { id } = req.params;

    try {
        const moduleToDelete = await Module.findOne({ _id: id });
        
        const username = moduleToDelete.author;

        const user = await User.findOne({ username: username });
        let userModuleArray = user.modules;

        const index = userModuleArray.indexOf(id);
        if (index > -1) {
            userModuleArray.splice(index, 1);
        }

        User.updateOne({username: username}, {modules: userModuleArray},
                function (err, docs) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Updated : ", docs)
                }
            }
        )
        
        await Module.deleteOne({ _id: id })

        res.status(200).json({ message: "Success" });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getModule = async (req, res) => {
    console.log(req.params)
    const { id } = req.params;
    console.log(id)

    try {
        const module = await Module.findOne({ _id: id })
        
        res.status(200).json(module);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createModule = async (req, res) => {
    let modTitle = "Module" + Math.floor(Math.random() * 9) + Math.floor(Math.random() * 9) + Math.floor(Math.random() * 9);
    let modText = `All'improviso mi è scattato qualcosa nella testa e ho pensato: "A me piace farlo". E in quel preciso istante ho scoperto una libertà che non posedevo prima.`

    if (!(req.body.title == ""))
        modTitle = req.body.title   
        
    if (!(req.body.text == ""))
        modText = req.body.text

    if (modText.length < 100)    
        return res.status(400).json({ message: "Text must be at least 100 characters. "});

    if (modTitle.length < 5)    
        return res.status(400).json({ message: "Title must be at least 5 characters. "});

    const existingModule = await Module.findOne({ title: modTitle });

    if (existingModule)
        return res.status(400).json({ message: "Module with this name already exists. "});

    const module = {
        title: modTitle,
        text: modText,
        author: req.body.author
    }

    const newModule = new Module({ ...module })

    // Add Module
    try {
        await newModule.save();
        User.updateOne({username: req.body.author}, {$push: { modules: newModule._id}},
                function (err, docs) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Updated : ", docs)
                }
            }
        )

        res.status(201).json(newModule);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const addFlashcards = async (req, res) => {
    const { id } = req.params;
    const flashcards = req.body.flashcards;

    try {
        // const module = await Module.findOne({ _id: id })
        Module.updateOne({_id: id}, {flashcards: flashcards},
                function (err, docs) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Updated : ", docs)
                }
            }
        )
        
        res.status(200).json(flashcards);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}