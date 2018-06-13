import { createElement, ScriptableScene } from "metaverse-api";
import { setState, getState } from "./State";

import generator from 'generate-maze'



export default class HouseScene extends ScriptableScene {
  
  sceneDidMount() {    
    this.eventSubscriber.on("door_click", () => {
      setState({ isDoorClosed: !getState().isDoorClosed });
    });
  }

  async render() {
    
    /*
    const doorRotation = {
      x: 0,
      y: getState().isDoorClosed ? 0 : 90,
      z: 0
    };
    */

    /*
    var scene_xml = (
      <scene position={{ x: 5, y: 0, z: 5 }}>
        <entity
          rotation={doorRotation}
          transition={{ rotation: { duration: 1000, timing: "ease-in" } }}
        >
          <box
            id="door"
            scale={{ x: 1, y: 2, z: 0.05 }}
            position={{ x: 0.5, y: 1, z: 0 }}
            color="brown"
          />
        </entity>
        <box
          position={{ x: 2, y: 1, z: 0 }}
          scale={{ x: 2, y: 2, z: 0.05 }}
          color="blue"
        />
        <box
          position={{ x: -1, y: 1, z: 0 }}
          scale={{ x: 2, y: 2, z: 0.05 }}
          color="blue"
        />
      </scene>
    )
    */
    var maze = generator(4, 4);   
    /*
    maze[0][0] = {
      x: 0,          // Horizontal position, integer
      y: 0,          // Vertical position, integer
      top: true,    // Top/Up has a wall/blocked if true, boolean 
      left: true,   // Left has a wall/blocked if true, boolean
      bottom: true,  // Bottom/Down has a wall/blocked if true, boolean
      right: true,   // Right has a wall/blocked if true, boolean
      set: 5         // Set # used to generate maze, can be ignored
    }
    */
    var componentList = [];
    for(var root in maze) {
      for (var wall in maze[root]) {
        console.log(root)
        console.log(wall)
        

        if(maze[root][wall].top) {
          var rotX = 0;
          var rotY = 0;
          var rotZ = 0;
          var posX = parseInt(maze[root][wall].x);
          var posY = 0;
          var posZ = parseInt(maze[root][wall].y);

          const wallRotation = {
            x: rotX,
            y: rotY,
            z: rotZ
          };
          const wallPlacement = {
            x: posX,
            y: posY,
            z: posZ
          };
          componentList.push(
            <entity rotation={wallRotation}>
              <box
                position={wallPlacement}
                scale={{ x: 1, y: 1, z: .05 }}
                color="red"
              />
            </entity>
          )
        }
        if(maze[root][wall].left) {
          var rotX = 0;
          var rotY = 90;
          var rotZ = 0;
          var posX = parseInt(maze[root][wall].x) - 0.5;
          var posY = 0;
          var posZ = parseInt(maze[root][wall].y) - 0.5;

          const wallRotation = {
            x: rotX,
            y: rotY,
            z: rotZ
          };
          const wallPlacement = {
            x: posX,
            y: posY,
            z: posZ
          };
          componentList.push(
            <entity rotation={wallRotation}>
              <box
                position={wallPlacement}
                scale={{ x: 1, y: 1, z: .05 }}
                color="blue"
              />
            </entity>
          )
        }
        if(maze[root][wall].bottom) {
          var rotX = 0;
          var rotY = 0;
          var rotZ = 0;
          var posX = parseInt(maze[root][wall].x);
          var posY = 0;
          var posZ = parseInt(maze[root][wall].y) + 1;

          rotY = 0;
          const wallRotation = {
            x: rotX,
            y: rotY,
            z: rotZ
          };
          const wallPlacement = {
            x: posX,
            y: posY,
            z: posZ
          };
          componentList.push(
            <entity rotation={wallRotation}>
              <box
                position={wallPlacement}
                scale={{ x: 1, y: 1, z: .05 }}
                color="green"
              />
            </entity>
          )
        }
        if(maze[root][wall].right) {
          var rotX = 0;
          var rotY = 90;
          var rotZ = 0;
          var posX = parseInt(maze[root][wall].x) - 0.5;
          var posY = 0;
          var posZ = parseInt(maze[root][wall].y) + 0.5;

          const wallRotation = {
            x: rotX,
            y: rotY,
            z: rotZ
          };
          const wallPlacement = {
            x: posX,
            y: posY,
            z: posZ
          };
          componentList.push(
            <entity rotation={wallRotation}>
              <box
                position={wallPlacement}
                scale={{ x: 1, y: 1, z: .05 }}
                color="yellow"
              />
            </entity>
          )
        }        
      }
    }

    return (
      <scene position={{ x: 5, y: 0, z: 5 }}>
      {componentList}
      </scene>
    );
  }
}
