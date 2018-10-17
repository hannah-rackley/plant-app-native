### Thyme Tracker
-----------------

![demo-video](https://www.youtube.com/watch?v=5M_PMyUh98k&feature=youtu.be)

Application built using React Native, Redux, Expo, and Native Base on the frontend and Node.js, Express, and PostgreSQL on the backend. The backend for this project is deployed on AWS. The app can currently be viewed through an IOS Simulator on your laptop, or by downloading Expo and starting the app through that on your phone.

The purpose of Thyme Tracker is to provide a mobile application that allows the user to store info about their plants all in one place. They can also upload photos from their camera roll and see the progress each plant has made. On the user's home screen all of their plants will be displayed in order based upon which plants need to be watered the soonest. The color of each plant card also gives some quick insight into how soon you will need to water each plant.

## Target User
--------------
The target user for this application is a plant owner that wants a way to track the watering schedule for all of their plants in one place. 

## User Authentication
----------------------
My database contains a user table for each person that has signed up. When signing up or logging in, the user will be provided with a JSON Web Token and they will not have to sign in again throughout that process. The token and the user's id (taken from the database) are then stored in Asyncstorage until the sign out.  Once the user has been verified, he/she will be redirected to the 'AppStack'.

## Notes About Navigation
-------------------------
Here you can see that I used three different types of navigation:

```javascript
    const AppStack = createBottomTabNavigator({ Home: UserHomeScreen, 'Add Plant': AddPlantScreen, Signout: SignoutScreen})
    const AuthSwitch = createSwitchNavigator({ Login: LoginScreen, Signup: SignupScreen })
    const PlantNavigator = createBottomTabNavigator({ Info: PlantScreen, Photos: PhotoScreen})

    const PlantStack = createStackNavigator({
        Plant: {
        screen: PlantNavigator,
        },
        Main: {
        screen: AppStack
        }, 
    },
        {
        mode: 'modal',
        headerMode: 'none',
        },
    {
        initialRouteName: 'Plant'
    }
    );

    const AppNavigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen, 
        App: AppStack, 
        Auth: AuthSwitch,
        Plant: PlantStack
    },
    {
        initialRouteName: 'AuthLoading'
    }
    ); 
```
A deeper dive into these navigators shows that the user starts out with the AuthLoadingScreen. At this screen, there is a call to AsyncStorage to check for a token. The extra fonts used in the app are also fetched at this screen. The suer never really gets to see this screen, but very important things are happening here!

Next, the user moves into the AppStack. From there, he/she can view all of his/her current plants if there are any. Additionally, there is a page on which plants can be added and a page that allows the user to sign out.

One of the more dynamic stacks is the PlantStack. The PlantStack can be navigated to by clicking on one of the plant cards on the home screen. An action is then dispatched to the Redux store that updates the 'currentPlant' and the information displayed on the Info and Photos screens will be based upon the currentPlant. The only way to get back to the AppStack from here is to select the home icon at the top right of the screen.

## Database Storage vs. Redux Store
-----------------------------------

As discussed previously, the database for this project was created using PostgreSQL. Within that database, there is a users table and a plants table. The tables are linked by the id on the users table for each user and the associated user_id that is set for each new plant that is added. The user that is logged in can only view his/her plants that are associated with his/her user_id in the plants table. 

There are frequent calls to the database when any of the data is changed or removed. The Reduc store only contains three elements - the current list of plants, the current selected plant, and boolean value that determines whether the user home screen needs to re-render or not based upon changes to stored data. The plants are not actually sorted by water times in the backend database - that is something that is only needed on teh frontend for visualization and so the sorting occurs there. 

## Sorting Plants
-----------------
A very important aspect of this app is a way to track time. The date-fns library was the best fit for the needs of this application. Some of the main functions used are the parsing and formatting of chosen dates stored in the database. Another very important funcrtion was the differenceInMinutes. That funciton allowed me to accurately sort the plants based upon which plants will need to be watered the soonest. Originally I was using differenceInDays - but this was not a precise enough measure to avoud strange bugs with the coloring of each plant card and the ordering of the list. The below funciton shows how the waternig dates were calculated and how the user's plant list was sorted.

```javascript
  sortPlants(plants) {
    let updatedPlants = plants.map(plant => {
      let result = addDays(parse(plant.last_watered), plant.water_frequency);
      let minutesTilWater = differenceInMinutes(result, new Date());
      return {...plant, water_next: result, minutesTilWater: minutesTilWater};
    })
    compare = (a, b) => {
      let comparison = 0;
      if (a.minutesTilWater > b.minutesTilWater) {
        comparison = 1;
      } else if (b.minutesTilWater > a.minutesTilWater) {
        comparison = -1;
      }
      return comparison;
    }
    let sortedPlants = updatedPlants.sort(compare);
    return sortedPlants;
  }
```

## ImagePicker
--------------
One of the final features implemented in this project was the Image Picker. Thankfully, expo made this part very simple! 
In order to pull from the camera roll on a device, the user must have first allowed this app to have access to their camera roll. This was a simple check that was done before the image picker had loaded up - and it was not required to be done repeatedly for the same device.

Currently, the main selected image is just the one that was most recently updated -but a feature that will be implemented in the future will alow the user to change their selected photo that gets displayed on the plant card and delete photos he/she no longer wants included in the photo gallery for a specific plant. 


## Future Goals
---------------
Styling for Android - the styling could be improved on Android so that it mroe closely reflects the appearance of the app on IOS.

Greater control over image library and ability to open your camera and take a photo from wihtin the app.
