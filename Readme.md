# ICP_WMS 
**Warehouse Management System** built on **Internet Computer Protocol**.
Operations are allowed through __Canisters__ definition deployed on **ICP** protocol.

## Installation
### Windows
**ICP_WMS** is designed to be used on **UNIX-Like** systems such as **Linux** or **MacOS**. 
To get it on **Windows** system, you need to set up the **Windows SubSystem for Linux(_WSL_)**.
### Linux and MacOS
#### Setting up
##### Node.js and NPM
ICP_WMS is designed to run with Node.js v18 and require NPM to manage dependencies.
To get it, you can use Node Version Manager(NVM) that is useful tool allowing 
you to manage Node.js version and to quickly switch into other one.

###### NVM installation
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
    
    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
    
    bash: source ~/.bashrc

###### Node v18 and NPM installation
* Install **Node.js** v**18** from **NVM** tool

  
  nvm install 18 
    nvm use 18

* Install NPM


    nvm install-latest-npm

##### DFX
**DFX** is _command-line interface_ for **ICP** used to manage **Azle** projects as **ICP_WMS**. 
**DFX** is required for _local_ or _on-chain_ deployment of **ICP_WMS** canisters.

* Install **DFX**:


    DFX_VERSION=0.14.1 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"

* Add DFX to your path


    echo 'export PATH="$PATH:$HOME/bin"' >> "$HOME/.bashrc"

You'll need to reload your terminal to use **DFX** command.

#### Clone Repo and install dependencies
**Git** is required to clone this repository

* **_Clone_** this repo

  
    git clone https://github.com/maxx6262/icp_wms

* **_install_** project dependencies 


    cd icp_wms
    npm install

#### Starting Internet Computer

* Initialize a local Internet Computer replica


    dfx start --background --clean 
    
* Deploy ICP_WMS canister


    dfx deploy

### Interacting with ICP_WMS with CLI commands


## Features
This is a fully **Decentralized Application (_DAPP_)** made on **Internet Computer Protocol (_ICP_)**.
** ICP ** provides a fully decentralized and smart way to improve **trustability** and **security** of datas and compute operations.

**ICP_WMS** is like **toolbox** providing all users smart features to **get**, **share** and **manage** supplying data.

ICP_WMS users would be:
2. Stock holder, item supplier
2. Customer
3. B2B suppliers

To match users _needings_, there are many understandable features.

### Reference module
In **ICP_WMS**, _items_ are called **Stuffs**. 
Stuff **References** are stored by _on-chain_ operations.
**Reference** must be unique to provide **high-precision** of shared data, and to improve **data quality**.

**Reference** allows to create **unique shared standard representation** for any stuff.

A **stuff**reference is represented by: 

* **publicID** being a **_public unique number_** used to identify reference
* **Name** of item
* **Description** 

An user may get **_all references_** data by parsing **global catalog**.
When a new stuff reference is added, data is stored on-chain. PublicID allows all users to get item data. When a reference is removed from global catalog, any call from its **publicID** would return **_void_** value.

## Supply module
_User_ storing items is called a **supplier**.
**ICP_WMS** allows suppliers to manage their stocks values, and orders placed by **customers** or other **suppliers**.
Supplier can **add**/**remove**/**sell** items according his owned **stock data**.
**Suppliers** are able to _share_ defined **_Stock_ data** with customers and other suppliers. 

To perform this feature, he has to define **Orderable Stock Data(_OSD_)**.
**OSD** is represented by:
* **Item Reference** being _ID_ of item from **Global Reference Catalog(_GRC_)**
* **Owned** amount of item 
* **Orderable** amount of item being quantity of item **Customers** could order
* **Supplyable** amount of item being quantity of item **_other Suppliers_** could order
* **Customer Pricing**
* **Supplier Pricing**

## Order module

This **_module_** is used to manage orders of items from _customers_ or _suppliers_ to **Supplier**.
