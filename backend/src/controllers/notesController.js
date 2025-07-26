import Note from "../models/Note.js"


export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({createdAt:-1})
        res.status(200).json(notes)

    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ message: "Internal Server Error" })
    }

}

export async function getNoteById(req, res) {
    try {
        const noteById = await Note.findById(req.params.id);
        if (!noteById) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(noteById);
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function createNote(req, res) {
    try {

        const { title, content } = req.body;
        const note = new Note({ title: title, content: content });
        const savedNote = await note.save();
        res.status(201).json({ savedNote })
    }
    catch (error) {
        console.log("Error in adding");
        res.status(500).json({ message: "unable to create" })
    }

}

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        if(!updatedNote){
            return res.status(404).json({message:"Note not found"})
        }
        res.status(200).json(updatedNote)
    } catch (error) {
        console.log("Error in updating");
        res.status(500).json({ message: "unable to update" })
    }
}

export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Deleted Successfully" });
    } catch (error) {
        console.log("Error in Delete");
        res.status(500).json({ message: "Unable to Delete" });
    }
}
