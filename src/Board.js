import React, { Component, PropTypes } from 'react';
import Square from './Square';
import Knight from './Knight';

export default class Board extends Component {
    _renderSquare(i) {
        const x = i % 8;
        const y = Math.floor(i / 8);
        const black = (x + y) % 2 ===1 ;

        const [knightX, knightY] = this.props.knightPosition;
        const piece = (x === knightX && y === knightY)
            ? <Knight />
            : null;

        return (
            <div key={i}
                style={{width: '12.5%', height: '12.5%' }}>
                <Square black={black}>
                    {piece}
                </Square>
            </div>
        );
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