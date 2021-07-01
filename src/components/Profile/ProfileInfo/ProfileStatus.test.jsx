import React from 'react';
import renderer from 'react-test-renderer';
import ProfileStatusDelete from "./ProfileStatus---delete";

describe('ProfileStatus component',() => {
    test('status from props should be in state', () => {
        const component = renderer.create(<ProfileStatusDelete status='statusText'/>);
        const instance = component.getInstance()
        expect(instance.state.status).toBe('statusText');
    });

    test('span should be displayed', () => {
        const component = renderer.create(<ProfileStatusDelete status='statusText'/>);
        const root = component.root;
        const span = root.findByType('span');
        expect(span.children.length).not.toBeNull();
    });

    test("after creation input shouldn't be displayed", () => {
        const component = renderer.create(<ProfileStatusDelete status='statusText'/>);
        const root = component.root;
        expect(() => {
            const input = root.findByType('input');
        }).toThrow();
    });

    test ('span should place the status inside', () => {
        const component = renderer.create(<ProfileStatusDelete status='statusText'/>);
        const root = component.root;
        const span = root.findByType('span');
        expect(span.children[0]).toBe('statusText');
    })

    test('input should be displayed in editMode instead of span',() => {
        const component = renderer.create(<ProfileStatusDelete status='statusText'/>);
        const root = component.root;
        const span = root.findByType('span');
        span.props.onDoubleClick();
        const input = root.findByType('input');
        expect(input.props.value).toBe('statusText');
    })

    test('callback should be called', () => {
        const updateStatus = jest.fn();
        const component = renderer.create(<ProfileStatusDelete status='statusText'
                                                               updateStatus={updateStatus}/>);
        const instance = component.getInstance()
        instance.deactivateEditMode();
        expect(updateStatus.mock.calls.length).toBe(1);
    })
})