import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { isTSAnyKeyword } from '@babel/types';
import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from "react-dom/test-utils";
import '@testing-library/jest-dom';
import { v4 as uuidv4 } from 'uuid';
import { Badge } from './Badge';

afterEach(() => {
  // cleanup on exiting
  cleanup();
});

describe("Badge component tests", () => {
  it("rendered successful", () => {
    const div = document.createElement("div");
    render(
      <Badge color="red">Hello world with my custom children</Badge>
    );
  });
  
  it('renders with props correctly', () => {
    const children = 'Hello world in here';
    const { getByTestId } = render(
      <Badge color="red">{children}</Badge>
    );
    expect(getByTestId("badge-container")).toHaveTextContent(children);
  });


  it('matches snapshot', () => {
    const tree = renderer.create(
      <Badge color="#efe112">
        <div>
          Custom badge in here
        </div>
        <p>Another child</p>
      </Badge>
    ).toJSON();
    expect(tree).toMatchSnapshot()
  });
  
});