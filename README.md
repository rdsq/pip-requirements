# Pip Requirements

This useless extension gives you some tools for the requirements.txt file

## Taskbar

It adds buttons for `pip freeze` and `pip install -r` commands to the taskbar of requirements editors

## Command Pallete

You can also use these commands from the Command Pallete, but this is not very useful

## Commands

- `Pip Requirements: Install`: install requirements from the current file
- `Pip Recuirements: Freeze`: write all installed packages to the current file
- `Pip Requirements: Install manually`: install requirements from the selected file
- `Pip Requirements: Freeze manually`: write all installed packages to the selected file

## Editor Context Menu

You can click on any row in your requirements file to:

- `Install Pip Package` install the package
- `View Pip Package In Browser` open the package page in the browser on [pypi.org](https://pypi.org/)

## Explorer context menu

You can also do the same things you can do on the editor's taskbar (`install` and `freeze`) in the context menu on the requirements file in the explorer

## Settings

You can configure if the input field of these manual commands should ignore when you move your focus out of it