import { Saga, Task } from 'redux-saga';

export interface InjectSagaDescriptor {
  saga: Saga;
  mode: string;
  task: Task;
}

export interface InjectedSagas {
  [key: string]: InjectSagaDescriptor;
}
