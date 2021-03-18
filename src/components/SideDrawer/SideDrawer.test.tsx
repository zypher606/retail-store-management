import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { SideDrawer } from './SideDrawer';
import { isTSAnyKeyword } from '@babel/types';
import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from "react-dom/test-utils";
import '@testing-library/jest-dom';

afterEach(() => {
  cleanup();
});

describe("Side drawer tests", () => {
  it("render successful", () => {
    const div = document.createElement("div");
    render(
      <SideDrawer 
        isDrawerOpen={true} 
        profile={{}}  
        handleDrawerClose={() => {}} 
      />
      
    );
  });
  
  it('renders correct', () => {
    const { getByTestId } = render(
      <SideDrawer 
        isDrawerOpen={true} 
        profile={{}} 
        handleDrawerClose={() => {}} 
    />);
  
    expect(getByTestId('button-mailbox')).toHaveTextContent('Mailbox')
  });
  
  it('renders the props exactly', () => {
    const payload = { name: 'Ashim Raj Konwar' };
    const { getByTestId } = render(
      <SideDrawer 
        isDrawerOpen={true} 
        profile={payload} 
        handleDrawerClose={() => {}} 
    />);
    expect(getByTestId('user-fullname')).toHaveTextContent(payload.name)
  });
  
  
  
  // Snapshot test
  // it('matches snapshot', () => {
  //   const tree = renderer.create(
  //     <SideDrawer 
  //     isDrawerOpen={true} 
  //     profile={{}} 
  //     handleDrawerClose={() => {}} 
  // />
  //                 ).toJSON();
  //   expect(tree).toMatchSnapshot()
  
  // });
  
  
  // it("renders with or without a name", () => {
  //   act(() => {
  //     render(<SideDrawer 
  //             isDrawerOpen={true} 
  //             profile={{}} 
  //             handleDrawerClose={() => {}} 
  //         />, container);
  //   });
  //   expect(container.textContent).toBe("Hey, stranger");
  
  //   act(() => {
  //     render(<SideDrawer 
  //             isDrawerOpen={true} 
  //             profile={{}} 
  //             handleDrawerClose={() => {}} 
  //         />, container);
  //   });
  //   expect(container.textContent).toBe("Hello, Jenny!");
  
  //   act(() => {
  //     render(<SideDrawer 
  //             isDrawerOpen={true} 
  //             profile={{}} 
  //             handleDrawerClose={() => {}} 
  //         />, container);
  //   });
  //   expect(container.textContent).toBe("Hello, Margaret!");
  // });
  
});
