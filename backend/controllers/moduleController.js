import mongoose from "mongoose";
import Module from "../models/module.js";

export const getModules = async (req, res) => {
    try {
        const testData = await Module.find();

        res.status(200).json(testData);
    } catch (error) {
        res.status(404).json({ message: error.message });
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

    const module = {
        title: "Module" + Math.floor(Math.random() * 9) + Math.floor(Math.random() * 9) + Math.floor(Math.random() * 9),
        text: req.body.text
    }

    const newModule = new Module({ ...module })

    try {
        await newModule.save();

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
        Module.updateOne({$inc: {_id: id}}, {flashcards: flashcards},
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