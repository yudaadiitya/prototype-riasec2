import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';
import Signal from './assets/images/signal.png';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import './index.css';

const ContainerDrop = styled.div`
  display: block;
  justify-content: center;
  min-height: 64px;
  align-items: center;
`;

class InnerList extends React.PureComponent {
  render() {
    const { column, taskMap, index, option } = this.props;
    const tasks = column.taskIds.map((taskId) => taskMap[taskId]);
    return (
      <Column column={column} tasks={tasks} index={index} option={option} />
    );
  }
}

class App extends React.Component {
  state = initialData;

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(this.state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        columnOrder: newColumnOrder,
      };
      this.setState(newState);
      return;
    } else {
    }

    const home = this.state.columns[source.droppableId];
    const foreign = this.state.columns[destination.droppableId];

    if (home === foreign) {
      const newTaskIds = Array.from(home.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newHome = {
        ...home,
        taskIds: newTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newHome.id]: newHome,
        },
      };

      this.setState(newState);
      return;
    }

    // moving from one list to another
    const homeTaskIds = Array.from(home.taskIds);

    homeTaskIds.splice(source.index, 1);
    const newHome = {
      ...home,
      taskIds: homeTaskIds,
    };

    const foreignTaskIds = Array.from(foreign.taskIds);
    if (foreignTaskIds.length < 1) {
      foreignTaskIds.splice(destination.index, 0, draggableId);
      const newForeign = {
        ...foreign,
        taskIds: foreignTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newHome.id]: newHome,
          [newForeign.id]: newForeign,
        },
      };
      this.setState(newState);
    }
  };

  render() {
    const { columns, columnOrder, tasks, option } = this.state;

    const layout = columnOrder[6];
    const isButton = columns[layout].taskIds.length;
    const nextButton =
      isButton === 0 ? (
        <Button
          variant="contained"
          style={{
            backgroundColor: '#005589',
            width: 132,
            height: 40,
            position: 'relative',
            left: 80,
            bottom: 80,
          }}
          onClick={() => this.setState(initialData)}
        >
          <ArrowRightAltIcon style={{ color: '#ffffff' }} />
        </Button>
      ) : (
        <div></div>
      );
    return (
      <Container
        maxWidth="sm"
        style={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <h1 className="label-test">RIASEC</h1>
        <div className="layout">
          <div className="instruction">
            <p>Drag pernyataan kedalam kolom kesesuaian</p>
            <img src={Signal} alt="signal" />
          </div>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable
              droppableId="all-columns"
              direction="vertical"
              type="column"
            >
              {(provided) => (
                <div>
                  <ContainerDrop
                    {...provided.droppableProps}
                    innerRef={provided.innerRef}
                  >
                    {this.state.columnOrder.map((columnId, index) => {
                      const column = this.state.columns[columnId];
                      return (
                        <InnerList
                          key={column.id}
                          column={column}
                          taskMap={this.state.tasks}
                          index={index}
                          option={option}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </ContainerDrop>
                </div>
              )}
            </Droppable>
            {nextButton}
          </DragDropContext>
        </div>
      </Container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
