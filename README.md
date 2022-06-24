# Jumia Interview

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.3.

# Author
Collins Kipkirui Bett

# Description
This is an application to fetch user information from randomuser.me API. The fetched information is desplayed using Material tables. 

# Features
- Infinite Virtual Scrolling
- Angular Material Styling
- Angular bootstrap Styling
- MatTableExport to CSV file
- RxJs library using Observables to fetch API data
- Ngx-Loading
- randomuser.me

# Behaviour Driven Development
- Its a simple application that displays data on the first page, on scroll it loads more data using the infinite scrolling idea.

# Set up and Installations
Follow the following installation to setup the application
1. On local Machine
    - run git clone "https://github.com/collinsbett24/jumia-task.git"
    - inside your new applications directory 
        ->run npm install npm
    ## run on localhost
    - run ng serve --open


2. On EC2 container
    - it clone on ubuntu serve or linux server
        run git clone "https://github.com/collinsbett24/jumia-task.git"
    - move to you new applications directory and build a docker image using the following command
        docker build -t jumia-task-image .
    ## run project on container
    - docker run --name jumia-task-container -d -p 8080:80 francium-ui-image

3. Set up on Heroku


# Testing
The project can go throught the following tests

## Unit Testing
 Unit testing can be done on the project using the jasmine default setting. To perform unit testing on this project, run the following command:-
        - ng test 

 ## E2E Testing
 End to End Testing was done and can be done on this project.
    Cypress has been configured in place of protractor to run E2E test file run the following command:

        - npm run  cypress:run
        OR
        - ng e2e



# Technology Used
- angular v13.3.3
- rxjs v7.5.0
- sweetalert2 v11.4.18,
- zone.js v0.11.4
- typescript v4.6.2
- jasmine-core v4.0.0,
- karma v6.3.0,
- npm v8.10.0
- node v16.14.2
- angular/material v13.3.9
- @ng-bootstrap/ng-bootstrap v12.1.2,
- mat-table-exporter v10.2.4
- cypress/schematics

# Future Implimentation
Future implimentation can be achieved by improving filtering to both age and location.

# Known Bugs
//

# Copyright and License
The project if under MIT License . Copyright 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
