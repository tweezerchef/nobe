import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid, Card, CardContent, Typography,
} from '@material-ui/core';
import axios from 'axios';
import styled from 'styled-components';
import CreateClubs from '../components/CreateClubs/CreateClubs';
import { ClubHeader } from './style';

export interface Club {
  id: string;
  name: string;
  description: string;
  image: string;
  clubMembers: string[];
}

function Clubs() {

}
export default Clubs;
