# Pip Requirements

This useless extension gives you some tools for the requirements.txt file

## Taskbar

It adds buttons for `pip freeze` and `pip install -r` commands to the taskbar of requirements editors

## Command Palette

You can also use these commands from the Command Palette, but this is not very useful

- `Pip Requirements: Install`: install requirements from the current file
- `Pip Requirements: Freeze`: write all installed packages to the current file

## Not Command Palette Commands

You cannot use those from the Command Palette, but you can use those through the VSCode API or the keybindings menu, but only after activating the extension

- `pip-requirements.install-manual` - Install the requirements with manually defined path
- `pip-requirements.freeze-manual` Freeze the requirements with manually defined path

## Editor Context Menu

You can click on any row in your requirements file to:

- `Install Pip Package` install the package
- `View Pip Package In Browser` open the package page in the browser on [pypi.org](https://pypi.org/)

## Explorer context menu

You can also do the same things you can do on the editor's taskbar (`install` and `freeze`) in the context menu on the requirements file in the explorer

## Settings

`pip-requirements.ignoreFocusOut`: should the input fields of the manual commands not close when you move your focus out of them 