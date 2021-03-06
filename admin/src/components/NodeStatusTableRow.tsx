import React from 'react';
import { Node, NodeStatus } from '../models/Node';
import { Step } from '../models/Step';
import { DetailTabId } from '../models/DAGData';
import MultilineText from './MultilineText';
import NodeStatusChip from './NodeStatusChip';
import { TableCell } from '@mui/material';
import StyledTableRow from './StyledTableRow';
import { OpenInNew } from '@mui/icons-material';

type Props = {
  rownum: number;
  node: Node;
  file: string;
  name: string;
  onRequireModal: (step: Step) => void;
};

function NodeStatusTableRow({
  name,
  rownum,
  node,
  file,
  onRequireModal,
}: Props) {
  const url = `/dags/${name}?t=${DetailTabId.StepLog}&file=${file}&step=${node.Step.Name}`;
  const buttonStyle = {
    margin: '0px',
    padding: '0px',
    border: '0px',
    background: 'none',
    outline: 'none',
  };
  return (
    <StyledTableRow>
      <TableCell> {rownum} </TableCell>
      <TableCell> {node.Step.Name} </TableCell>
      <TableCell>
        <MultilineText>{node.Step.Description}</MultilineText>
      </TableCell>
      <TableCell> {node.Step.Command} </TableCell>
      <TableCell> {node.Step.Args ? node.Step.Args.join(' ') : ''} </TableCell>
      <TableCell> {node.StartedAt} </TableCell>
      <TableCell> {node.FinishedAt} </TableCell>
      <TableCell>
        <button style={buttonStyle} onClick={() => onRequireModal(node.Step)}>
          <NodeStatusChip status={node.Status}>
            {node.StatusText}
          </NodeStatusChip>
        </button>
      </TableCell>
      <TableCell> {node.Error} </TableCell>
      <TableCell>
        {node.Log ? (
          <a href={url}>
            <OpenInNew />
          </a>
        ) : null}
      </TableCell>
    </StyledTableRow>
  );
}
export default NodeStatusTableRow;
