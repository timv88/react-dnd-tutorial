import React, { Component, PropTypes } from 'react';
import BoardSquare from './BoardSquare';
import Knight from './Knight';
import { moveKnight, canMoveKnight } from './Game';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Board extends Component {
    _renderPiece(x, y) {
        const [knightX, knightY] = this.props.knightPosition;
        if (x === knightX && y === knightY) {
            return <Knight />
        }
        return null;
    }
    _renderSquare(i) {
        const x = i % 8;
        const y = Math.floor(i / 8);

        return (
            <div key={i}
                 style={{width: '12.5%', height: '12.5%' }}
                 onClick={() => this._handleSquareClick(x, y)}>
                <BoardSquare x={x}
                             y={y}>
                    {this._renderPiece(x, y)}
                </BoardSquare>
            </div>
        );
    }
    _handleSquareClick(toX, toY) {
        if (canMoveKnight(toX, toY)) {
            moveKnight(toX, toY);
        }
    }
    render() {
        const squares = [];
        for (let i=0; i<64; i++) {
            squares.push(this._renderSquare(i));
        }

        return (
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexWrap: 'wrap'
            }}>
                {squares}
            </div>
        )
    }
}

Board.PropTypes = {
    knightPosition: PropTypes.arrayOf(
        PropTypes.number.isRequired
    ).isRequired
};

export default DragDropContext(HTML5Backend)(Board);