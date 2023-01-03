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