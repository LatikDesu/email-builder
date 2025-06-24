import React from 'react'

import { Container as BaseContainer } from '@usewaypoint/block-container'

import { useCurrentBlockId } from '../../editor/EditorBlock'
import { setDocument, setSelectedBlockId, useDocument } from '../../editor/EditorContext'
import SortableEditorChildrenIds from '../helpers/EditorChildrenIds/SortableEditorChildrenIds'

import { ContainerProps } from './ContainerPropsSchema'

export default function ContainerEditor({ style, props }: ContainerProps) {
  const childrenIds = props?.childrenIds ?? [];

  const document = useDocument();
  const currentBlockId = useCurrentBlockId();

  const handleReorder = (oldIndex: number, newIndex: number, newChildrenIds: string[]) => {
    // Update document with new children order
    setDocument({
      [currentBlockId]: {
        type: 'Container',
        data: {
          ...document[currentBlockId].data,
          props: { childrenIds: newChildrenIds },
        },
      },
    });
  };

  return (
    <BaseContainer style={style}>
      <SortableEditorChildrenIds
        childrenIds={childrenIds}
        onChange={({ block, blockId, childrenIds }) => {
          setDocument({
            [blockId]: block,
            [currentBlockId]: {
              type: 'Container',
              data: {
                ...document[currentBlockId].data,
                props: { childrenIds: childrenIds },
              },
            },
          });
          setSelectedBlockId(blockId);
        }}
        onReorder={handleReorder}
      />
    </BaseContainer>
  );
}
