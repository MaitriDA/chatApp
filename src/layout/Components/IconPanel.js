import { InfoRounded, Settings } from '@material-ui/icons';
import React from 'react';
import fire from '../../helper/db';
import './IconPanel.css';
import MyContacts from './MyContacts';
import MobileScreenShareIcon from '@material-ui/icons/MobileScreenShare';
import { withStyles, Theme, makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

const IconPanel=(props)=>{
    const LightTooltip = withStyles((theme: Theme) => ({
        tooltip: {
          backgroundColor: '#feefec',
          color: 'rgba(0, 0, 0, 0.87)',
          boxShadow: theme.shadows[1],
          fontSize: 15,
          marginTop: 40,
          marginLeft: -10
        },
      }))(Tooltip);
    return(
       <div className="mainIconPanel">
           <LightTooltip title="My Profile" placement="right">
              <Button>
                <PersonIcon style={{fontSize:35,color:"white"}}/>
              </Button>
            </LightTooltip>
            <LightTooltip title="Add people" placement="right">
              <Button>
                <MyContacts addNewContact/>
              </Button>
            </LightTooltip>
            <LightTooltip title="Mobile App" placement="right">
              <Button>
                <MobileScreenShareIcon style={{fontSize:35,color:"white"}}/>
              </Button>
            </LightTooltip>
            <LightTooltip title="Settings" placement="right">
              <Button>
                <Settings style={{fontSize:35,color:"white"}}/>
              </Button>
            </LightTooltip>
            <LightTooltip title="About Us" placement="right">
              <Button>
                <InfoRounded style={{fontSize:35,color:"white"}}/>
              </Button>
            </LightTooltip>
            
        </div>
    );

}
export default IconPanel;