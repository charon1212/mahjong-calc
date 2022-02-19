import { AppBar, Box, Button, Paper, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import EfficencyCalc from './EfficencyCalc';
import RiskCalc from './RiskCalc';

const Main = () => {
  const [pageId, setPageId] = useState<'efficency-calc' | 'risk-calc'>('efficency-calc');
  const menuHandler = (id: typeof pageId) => {
    return () => {
      setPageId(id);
    };
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h5' sx={{ flexGrow: 1 }}>
              麻雀ツール
            </Typography>
            <Button color='inherit' variant='outlined' sx={{ margin: '0 5px 0 5px' }} onClick={menuHandler('efficency-calc')}>
              牌効率
            </Button>
            <Button color='inherit' variant='outlined' sx={{ margin: '0 5px 0 5px' }} onClick={menuHandler('risk-calc')}>
              安全度
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ width: { xs: '100%', sm: '590px' } }}>
          <Paper sx={{ padding: '5px' }}>
            {pageId === 'efficency-calc' ? <EfficencyCalc /> : ''}
            {pageId === 'risk-calc' ? <RiskCalc /> : ''}
          </Paper>
        </Box>
      </div>
    </>
  );
};

export default Main;
