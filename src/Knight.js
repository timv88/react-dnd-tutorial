import React, { Component, PropTypes } from 'react';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';

const knightSource = {
    beginDrag(props) {
        return {};
    }
}

function collect(collect, monitor) {
    return {
        connectDragSource: collect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class Knight extends Component {
    render() {
        const { connectDragSource, isDragging } = this.props;

        return connectDragSource(
            <div style={{
                fontSize: '3rem',
                opacity: isDragging ? 0.5 : 1,
                fontWeight: 'bold',
                cursor: 'move'}}>
                ♘
            </div>
        );
    }
}

Knight.PropTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
}

export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);