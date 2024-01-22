import * as React from 'react';
import styles from './HelloWorld.module.scss';
import type { IHelloWorldProps } from './IHelloWorldProps';
//import { escape } from '@microsoft/sp-lodash-subset';
//import NewComponent from './NewComponent';
import NewFunComponent from './NewFunComponent';
//import PostData from './PostData';
// jsx component:-
//import SubmitData from "./SubmitData"
import TodoList from './TodoList';
//import NewSlider from './NewSlider';
// import { submitProps } from './SubmitProps';
//import SubmitDatawithsphttp from './SubmitDatausingsphttp';
import SubmitDataToList from './CrudOperation/SubmitDataToList';
import GetListData from './CrudOperation/GetListData';
//import Temp from './CrudOperation/Temp';
import GetListItemById from './CrudOperation/GetListItemById';
import GraphApi from './CrudOperation/GraphApi';

export default class HelloWorld extends React.Component<IHelloWorldProps, {}> {
  public render(): React.ReactElement<IHelloWorldProps> {
    const {
     // description,
     // isDarkTheme,
     // environmentMessage,
      hasTeamsContext,
     // userDisplayName,
     // context,
      absoluteUrl
      
    } = this.props;
   
    
    return (
      <section className={`${styles.helloWorld} ${hasTeamsContext ? styles.teams : ''}`}>
         <div className={styles.welcome}>

        {/* <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Well done, {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>
          <div>Web part property value: <strong>{escape(description)}</strong></div>
        </div>
        <div>
          <h3>Welcome to SharePoint Framework!</h3>
          <p>
            The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It&#39;s the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
          </p>
          <h4>Learn more about SPFx development:</h4>
          
          <h1>here is my context and absolute url are given below:-</h1>
          {/* <h1>{escape(context.web)}</h1> */
          
          }
         
          
          <NewFunComponent
           name = "bharat"
           surname='yadav'
           Context={this.context}
           abosoluteUrl= {absoluteUrl}
          />
          {/* <PostData/> */}
          <TodoList/>
          {/* <NewSlider/>
          <SubmitData
           absoluteUrl= {absoluteUrl}
          />
          <SubmitDatawithsphttp
            absoluteUrl={absoluteUrl}
            spHttpClient={this.props.sphttpClinet}
          /> */}
          <SubmitDataToList
           absoluteUrl={this.props.absoluteUrl}
           spHttpClient={this.props.sphttpClinet}
          />
          <GetListData
           absoluteURL={this.props.absoluteUrl}
           spHttpClient={this.props.sphttpClinet}
          />
          {/* <Temp/> */}
          <GetListItemById
           absoluteURL={this.props.absoluteUrl}
           spHttpClient={this.props.sphttpClinet}
          />

          <h1>the graph api call is given here:</h1>
          <GraphApi
           msGraphClientFactory = {this.props.msGraph}
           sphttpClient={this.props.sphttpClinet}

          />
        
          
        </div>
      </section>
    );
  }
}
