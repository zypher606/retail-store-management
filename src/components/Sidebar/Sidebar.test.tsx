import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { Sidebar } from './Sidebar';
import { isTSAnyKeyword } from '@babel/types';
import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from "react-dom/test-utils";
import '@testing-library/jest-dom';
import Folders from './Folders';
import Labels from './Labels';
import { v4 as uuidv4 } from 'uuid';
import Categories from './Categories';

afterEach(() => {
  // cleanup on exiting
  cleanup();
});

describe("Sidebar component tests", () => {
  it("rendered successful", () => {
    const div = document.createElement("div");
    render(
      <Sidebar 
        unreadCount={7}  
        handleComposeMail={() => {}} 
      />
      
    );
  });
  
  it('renders with correct compose button', () => {
    const { getByTestId } = render(
      <Sidebar 
        unreadCount={12}  
        handleComposeMail={() => {}} 
      />
    );
    expect(getByTestId('compose-button')).toHaveTextContent('Compose Mail');
  });
  
});

describe("Folders component test cases", () => {
  it('renders with props correctly', () => {
    const count = 12;
    const { getByTestId } = render(
      <Folders unreadCount={count} />
    );
    expect(getByTestId('unread-badge')).toHaveTextContent(count.toString());
  });
});

describe("Labels component test cases", () => {
  it('renders with props correctly', () => {
    const labels = [
      {
        id: uuidv4(),
        name: 'Family',
      },
      {
        id: uuidv4(),
        name: 'Work',
      },
    ]
    const { getByTestId } = render(
      <Labels labels={labels} />
    );
    expect(getByTestId(labels[0].id)).toHaveTextContent(labels[0].name);
    expect(getByTestId(labels[1].id)).toHaveTextContent(labels[1].name);
  });
});

describe("Categories component test cases", () => {
  it('renders with props correctly', () => {
    const categories = [
      {
        id: uuidv4(),
        name: 'Work',
        color: '#4fb595'
      },
      {
        id: uuidv4(),
        name: 'Documents',
        color: '#ee524d',
      },
    ]
    const { getByTestId } = render(
      <Categories categories={categories} />
    );
    expect(getByTestId(categories[0].id)).toHaveTextContent(categories[0].name);
    expect(getByTestId(categories[1].id)).toHaveTextContent(categories[1].name);
  });
});

