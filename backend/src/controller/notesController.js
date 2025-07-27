import Note from "../models/Note.js";

export const getAllNotes = async ( _ , res) => {
    try {
        const notes = await Note.find().sort({createdAt:-1});
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error in getAllNotes controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}


export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) return res.status(400).json({ message: "Note not found" })
        res.json(note);
    }
    catch (error) {
        console.error("Error in getAllNotes controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body
        const newNote = new Note({ title, content })
        await newNote.save()
        res.status(201).json({ message: "Note created successfully" })
    }
    catch (error) {
        console.error("Error in createNote controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            {
                new: true,
            }
        );

        if (!updatedNote) return res.status(404).json({ message: "Note not found" });

        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" })
        }
        res.status(200).json({ message: "Note deleted successfully" })
    } catch (error) {
        console.error("Error in deleteNote controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}