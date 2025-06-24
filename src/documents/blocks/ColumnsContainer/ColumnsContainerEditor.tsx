import React from 'react'

import { ColumnsContainer as BaseColumnsContainer } from '@usewaypoint/block-columns-container'

import { useCurrentBlockId } from '../../editor/EditorBlock'
import { setDocument, setSelectedBlockId } from '../../editor/EditorContext'
import SortableEditorChildrenIds, { EditorChildrenChange } from '../helpers/EditorChildrenIds/SortableEditorChildrenIds'

import ColumnsContainerPropsSchema, { ColumnsContainerProps } from './ColumnsContainerPropsSchema'

const EMPTY_COLUMNS = [{ childrenIds: [] }, { childrenIds: [] }, { childrenIds: [] }];

export default function ColumnsContainerEditor({ style, props }: ColumnsContainerProps) {
  const currentBlockId = useCurrentBlockId();

  const { columns, ...restProps } = props ?? {};
  const columnsValue = columns ?? EMPTY_COLUMNS;

  const updateColumn = (columnIndex: 0 | 1 | 2, { block, blockId, childrenIds }: EditorChildrenChange) => {
    const nColumns = [...columnsValue];
    nColumns[columnIndex] = { childrenIds };
    setDocument({
      [blockId]: block,
      [currentBlockId]: {
        type: 'ColumnsContainer',
        data: ColumnsContainerPropsSchema.parse({
          style,
          props: {
            ...restProps,
            columns: nColumns,
          },
        }),
      },
    });
    setSelectedBlockId(blockId);
  };

  const handleColumnReorder = (columnIndex: 0 | 1 | 2) => 
    (oldIndex: number, newIndex: number, newChildrenIds: string[]) => {
      const nColumns = [...columnsValue];
      nColumns[columnIndex] = { childrenIds: newChildrenIds };
      setDocument({
        [currentBlockId]: {
          type: 'ColumnsContainer',
          data: ColumnsContainerPropsSchema.parse({
            style,
            props: {
              ...restProps,
              columns: nColumns,
            },
          }),
        },
      });
    };

  return (
    <BaseColumnsContainer
      props={restProps}
      style={style}
      columns={[
        <SortableEditorChildrenIds 
          key="col-0"
          childrenIds={columns?.[0]?.childrenIds} 
          onChange={(change) => updateColumn(0, change)}
          onReorder={handleColumnReorder(0)}
        />,
        <SortableEditorChildrenIds 
          key="col-1"
          childrenIds={columns?.[1]?.childrenIds} 
          onChange={(change) => updateColumn(1, change)}
          onReorder={handleColumnReorder(1)}
        />,
        <SortableEditorChildrenIds 
          key="col-2"
          childrenIds={columns?.[2]?.childrenIds} 
          onChange={(change) => updateColumn(2, change)}
          onReorder={handleColumnReorder(2)}
        />,
      ]}
    />
  );
}
