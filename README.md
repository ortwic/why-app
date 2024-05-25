<a name="readme-top"></a>

# Why-App
A philosophical tool for your existential journey.

# Content Management

## Creating Content

Content is managed with [FireCMS](https://app.firecms.co/p/why-app-8a640).

There are 3 collections for content:
- Guide
- Page
- Blog

Each guide can reference to n pages.

## Formatting Content

Markdown is supported where as it's extended to support img size, audio and embeded youtube videos. You can use it like this:

### Example image
```javascript
marked.parseInline("![](http://example.com/media/1.jpg 'style=width:300px,title=test img')")
```
generates:  
```<img src='http://example.com/media/1.jpg' style='width=300px' title='test img'></img>```  

### Example audio
```javascript
marked.parseInline("![this is audio](1.wav 'type=wav,controls,autoplay,muted')")
```
generates:   
```<audio alt='this is audio' controls><source src='1.wav' type='audio/wav'></audio>```  

### Example 3
```javascript
marked.parseInline("![](PB4gId2mPNc 'type=youtube,width=560,height=315,allow=accelerometer;autoplay;clipboard-write,allowfullscreen')");
```
generates:  
```<iframe width='560' height='315' src='https://www.youtube.com/embed/PB4gId2mPNc' title='YouTube video player' frameborder='0' allow='accelerometer;autoplay;clipboard-write;' allowfullscreen></iframe>```  

# Getting Started

## Prerequisites

You should install [nodejs](https://nodejs.org) and [pnpm](https://pnpm.io). I'd recommend [Visual Studio Code](https://code.visualstudio.com) for developing.

## Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/ortwic/why-app.git
   ```
2. Install NPM packages
   ```sh
   pnpm install
   ```

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Contributing

Really? This project is very small yet. Contact me if you really desire...

<p align="right">(<a href="#readme-top">back to top</a>)</p>