# Pip Requirements

This useless extension gives you some tools for the **requirements.txt** file

## Taskbar

It adds buttons for `pip freeze` and `pip install -r` commands to the taskbar of requirements editors

## Create Requirements File

There is a command to create a requirements file and immediately freeze packages to it: `Pip Requirements: Create Requirements File`

To use it, simply run it from the Command Palette. It will do everything else

## Command Palette

You can also use other commands from the **Command Palette**, but this is not very useful

- `Pip Requirements: Install`: **Install** requirements from the current file
- `Pip Requirements: Freeze`: **Freeze** all installed packages to the current file

## Editor **Context Menu**

You can click on any row in your requirements file to:

- `Install Pip Package` **install** the package
- `View Pip Package In Browser` **open** the package page in the browser on [pypi.org](https://pypi.org/)

## Explorer **Context Menu**

You can also do the same things you can do on the editor's taskbar (`install` and `freeze`) on the context menu of requirements files in the explorer

## Settings

`pip-requirements.ignoreFocusOut`: should the input fields of the commands not close when you move your focus out of them
