## pip-requirements

**Description:**

This extension provides two handy commands for working with `requirements.txt` files in Visual Studio Code:

* **Install pip Requirements:** Installs the packages listed in the current `requirements.txt` file.
* **Freeze pip Packages:** Generates a new `requirements.txt` file based on the currently installed packages.

**Features:**

* Integrates seamlessly with `requirements.txt` files.
* Runs commands directly in a terminal window.
* Provides clear error messages for invalid use.

**Installation:**

1. Open the **Extensions** view (**Ctrl+Shift+X** or **Cmd+Shift+X**).
2. Search for "pip-requirements".
3. Click on the **Install** button.

**Usage:**

1. Open a `requirements.txt` file in VS Code.
2. Right-click anywhere in the file and select the desired command:
    * **Install pip Requirements**
    * **Freeze pip Packages**

**Requirements:**

* Visual Studio Code version 1.86.0 or higher

**Contribution Points:**

This extension contributes the following commands and menus:

* **Commands:**
    * `pip-requirements.install`: Installs the packages listed in the current `requirements.txt` file.
    * `pip-requirements.freeze`: Generates a new `requirements.txt` based on the currently installed packages.
* **Menus:**
    * The commands are available within the context menu when editing a `requirements.txt` file.


**Contributing:**

We welcome contributions to this extension! Please refer to the contributing guidelines: [https://code.visualstudio.com/docs/sourcecontrol/github](https://code.visualstudio.com/docs/sourcecontrol/github) for more information.

**License:**

This extension is distributed under the MIT license. See the LICENSE: LICENSE file for details.
