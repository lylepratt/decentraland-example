import { createElement, ScriptableScene, ISimplifiedNode } from "metaverse-api";
import {getState } from "./State";

//import generator from 'generate-maze'

export interface IEntity {
  render(): ISimplifiedNode;
}

export class SpawnedEntity implements IEntity {
  position = { x: 5, y: 2, z: 5 };
  color = "#B0C4DE";
  render(): ISimplifiedNode {
    return (
      <entity position={this.position}>
        <box
          id="spawnedEntity"
          position={this.position}
          scale={{ x: .1, y: .1, z: .1 }}
          color={this.color}
        />
      </entity>
    );
  }
}

export default class HouseScene extends ScriptableScene<any, { time: number }> {
  spawnedEntities: IEntity[] = [];

  updateSpanedEntities() {
    for(const block in getState().blocks) {
        const coords = block.split(",");
        const placement = {
          x: parseInt(coords[0]) / 10,
          y: parseInt(coords[1]) / 10,
          z: parseInt(coords[2]) / 10
        };
        const spawnedEntity: SpawnedEntity = new SpawnedEntity();
        spawnedEntity.position = placement;
        spawnedEntity.color = getState().blocks[block].color;
        this.spawnedEntities.push(spawnedEntity);
    }
  }
  renderSpawnedEntities() {
    return this.spawnedEntities.map($ => $.render());
  }
  
  sceneDidMount() {    
    this.eventSubscriber.on("door_click", () => {
      //setState({ isDoorClosed: !getState().isDoorClosed });
    });
  }

  async render() {
    this.updateSpanedEntities();
    return <scene>{this.renderSpawnedEntities()}</scene>;
  }
}
