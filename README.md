# React Native Redux App - ToDox
![Technologies used](https://cdn-images-1.medium.com/max/1200/1*XLPUfIkmIA01h1D0ti-wJw.png)

ToDox is a hybrid React Native app using Redux, React functional components and hooks with the idea to be tested in a Android device (I can´t test on iOS)

## Visuals
![Navigation](https://res.cloudinary.com/omarpvcloud/image/upload/v1604589073/Projects/0-40sREACTNATIVETODO_jn7ymz.gif) ![Crud operations](https://res.cloudinary.com/omarpvcloud/image/upload/v1604589073/Projects/40s-100sREACTNATIVETODO_ar0uon.gif)

The idea is about to create a simple React Native application for learning purposes, fetching data from an API Rest ([API ToDo](https://github.com/Omar-Pecos/api-node-to-do))

## Try the app
Android 
[ToDox](https://play.google.com/store/apps/details?id=com.omarpv.todox)

## Technologies 
> React functional components using **hooks** , with **redux** and **react-redux** gives this application the ability to use a Redux store to handle and persist a local state, connected to our components and be able to provide them with data. Even performing operations that only affects the local state, like mark a todo as favorite  or mark it as done/undone or hide/unhide it.
> To fecth data from API I use asyncs requests with **axios** and **redux-thunk**

 > It uses **react-navigation/native** and **react-navigation/stack** to navigate between the Add/Edit/Delete confirmation screens and the root component (ToDo List). 
 
 > Uses **react-native** components to create the views and **react-native-in-app-message** to display notifications
 
 
