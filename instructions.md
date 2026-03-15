# Checklister web app

## Overview
We're building a web app that uses modern tools. The app is an app that provides interactive checklist for flight 
simulators.

The web app should be client-side only. No back-end. No database.
It will store no cookies.

The list of checklists will be dynamically loaded by scanning the "data" folder and reading all "*.yaml" files in it. Each YAML file is a specfic aircraft checlist.

## App structure:

* / (home): A list of supported airctafts, as well as a placeholder for general information about the app (who created it, how to report bugs, etc)
* /<aircraft>: A specific aircraft checklist
* /<aircraft>/<section>: A checklist section page. In it there is a list of checks to perform

## Details

### Home page
1. Have a list of buttons. One for each aircraft that has a checklist.
2. A text area at the bottom with placeholder text

### Aircraft checklist page
1. This page will immediatly redirect to the first checklist section of the selected aircraft

### Aircraft section page
1. Show the section name
2. Below it, a list of all the checklist actions in a tidy table. Each action will have a checkbox. Initially unchecked.
3. At the bottom of the page, there will be buttons to go to the previous and next section, if exists. Those buttons will be unclickable if this is the first or last section.

