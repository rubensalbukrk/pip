import React from "react";
import renderer from 'react-test-renderer'
import App from "./App";

describe('Teste instatâneo', () => {
    it('redenrização correta', () => {
        jest.useFakeTimers();
        const tree = renderer.create(<App />).toJSON();
        expect(tree).toMatchSnapshot()
    })
})