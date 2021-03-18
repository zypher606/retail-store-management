import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { isTSAnyKeyword } from '@babel/types';
import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from "react-dom/test-utils";
import '@testing-library/jest-dom';
import { v4 as uuidv4 } from 'uuid';
import { CustomAccordion } from './CustomAccordion';

afterEach(() => {
  // cleanup on exiting
  cleanup();
});

describe("CustomAccordion component tests", () => {
  it("rendered successful", () => {
    const div = document.createElement("div");
    render(
      <CustomAccordion 
        openDefault={true}
        fixed={false}
        heading="my heading for accordion"
        body="my body for accordion"
      />
    );
  });
  
  it('matches snapshot', () => {
    const tree = renderer.create(
      <CustomAccordion 
        openDefault={true}
        fixed={false}
        heading="my heading for accordion"
        body="my body for accordion"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot()
  });
  
});