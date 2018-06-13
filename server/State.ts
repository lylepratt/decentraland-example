import { updateAll } from './ConnectedClients'

//let state = {
//  isDoorClosed: false
//}

interface INameToValueMap
{
	[key: string]: any;
}
let stateMap: INameToValueMap = {}
stateMap['blocks'] = {};

export function getState(): typeof stateMap {
  return stateMap;
}

export function setBlockState(deltaState: Partial<typeof stateMap>) {
  for(var item in deltaState){
  	stateMap['blocks'][item] = deltaState[item];
  }
  console.log('new state:')
  console.dir(stateMap)
  updateAll()
}
