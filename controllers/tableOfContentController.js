const asyncHandler = require('express-async-handler');
const TableOfContentModel = require('../models/TableOfContentModel'); // Ensure the path is correct

// CREATE: Create a new table of content
const createTableOfContent = asyncHandler(async (req, res) => {
  const { title, description, link, order, parentId } = req.body;
  
  const tableOfContent = new TableOfContentModel({ title, description, link, order, parentId });
  await tableOfContent.save();
  
  res.status(201).json(tableOfContent);
});

// READ: Get all table of contents
const getAllTableOfContents = asyncHandler(async (req, res) => {
  const tableOfContents = await TableOfContentModel.find().populate('parentId');
  res.json(tableOfContents);
});

// UPDATE: Update a table of content
const updateTableOfContent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, link, order, parentId } = req.body;
  
  const updatedTableOfContent = await TableOfContentModel.findByIdAndUpdate(
    id,
    { title, description, link, order, parentId, updatedAt: Date.now() },
    { new: true }
  );
  
  if (!updatedTableOfContent) {
    return res.status(404).json({ error: 'Table of content not found' });
  }
  
  res.json(updatedTableOfContent);
});

// DELETE: Delete a table of content
const deleteTableOfContent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const deletedTableOfContent = await TableOfContentModel.findByIdAndDelete(id);
  
  if (!deletedTableOfContent) {
    return res.status(404).json({ error: 'Table of content not found' });
  }
  
  res.json({ message: 'Table of content deleted successfully' });
});

module.exports = {
  createTableOfContent,
  getAllTableOfContents,
  updateTableOfContent,
  deleteTableOfContent,
};
