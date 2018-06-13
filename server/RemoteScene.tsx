import { createElement, ScriptableScene } from "metaverse-api";
import {getState } from "./State";

//import generator from 'generate-maze'



export default class HouseScene extends ScriptableScene {
  
  sceneDidMount() {    
    this.eventSubscriber.on("door_click", () => {
      //setState({ isDoorClosed: !getState().isDoorClosed });
    });
  }

  async render() {
    
    var componentList = [];
    for(const block in getState().blocks) {
        const coords = block.split(",");
        const placement = {
          x: parseInt(coords[0]) / 10,
          y: parseInt(coords[1]) / 10,
          z: parseInt(coords[2]) / 10
        };
        componentList.push(
            <box              
              position={placement}
              scale={{ x: .1, y: .1, z: .1 }}
              color={getState().blocks[block].color}
            />
        )
    }

    return (
      <scene position={{ x: 1, y: 0, z: 1 }}>
      {componentList}
      </scene>
    );
  }
}
