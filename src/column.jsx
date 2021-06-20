import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './task';
import Box from '@material-ui/core/Paper';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import './index.css';

const Container = styled.div`
  margin: 8px;
  z-index: 1;
  padding: 2px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  height: 70px;
`;
const Title = styled.div`
  z-index: 2;
  position: relative;
`;
const TaskList = styled.div`
  border-radius: 12px;
  position: relative;
  bottom: 0px;
  left: 1px;
  height: 57px;
  width: 40;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? 'lightgrey' : 'inherit'};
  flex-grow: 1;
  align-item: center;
  justify-content: center;
`;

class InnerList extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.tasks === this.props.tasks) {
      return false;
    }
    return true;
  }
  render() {
    return this.props.tasks.map((task, index) => (
      <Task key={task.id} task={task} index={index} />
    ));
  }
}

export default class Column extends React.Component {
  render() {
    const { index, option } = this.props;
    console.log(index);
    // console.log(this.props.tasks[0].label);
    return (
      <Draggable draggableId={this.props.column.id} index={this.props.index}>
        {(provided) => (
          <Container
            {...provided.draggableProps}
            innerRef={provided.innerRef}
            className={`border${this.props.index}`}
            {...provided.dragHandleProps}
          >
            <div className="droppable-box">
              <div className={`frame-color${this.props.index}`}></div>
              <p className={`background-label${this.props.index}`}>
                {option[index]}
              </p>
              {index === 6 ? (
                <div></div>
              ) : (
                <DragIndicatorIcon
                  style={{
                    position: 'relative',
                    top: 16,
                    color: 'rgba(52, 52, 52, 0.5)',
                  }}
                />
              )}
            </div>
            <Droppable droppableId={this.props.column.id} type="task">
              {(provided, snapshot) => (
                <TaskList
                  {...provided.dragHandleProps}
                  innerRef={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <InnerList tasks={this.props.tasks} />
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}
