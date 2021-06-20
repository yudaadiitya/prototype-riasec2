import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  z-index: 3;
  position: absolute;
  flex-wrap: nowrap;
  padding: 2px;
  width: 270px;
  max-height: 60px;
  border-radius: 8px;
  background-color: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
  align-item: center;
  justify-content: center;
`;

export default class Task extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <p className="aitem">{this.props.task.content}</p>
          </Container>
        )}
      </Draggable>
    );
  }
}
