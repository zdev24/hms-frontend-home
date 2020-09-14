import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from "react";
import apiService from '../../../services/api.service';
import authService from "../../../services/auth.service";
import { ENVIRONMENT } from "../../../utils/constant";
import styles from "./Home.module.css";


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appArr: ENVIRONMENT().appArr,
      user: authService.getUser(),
      userLogo: authService.getUserLogo(),
      orgInfo: {}
    };
  }

  componentDidMount() {
    if (this.state.user) {
      this.getDataFromServer().then(() => {
        this.setupAppArr();
      })
    } else {
      this.props.history.push("/login");
    }
  }

  getDataFromServer() {
    return new Promise((resolve, reject) => {
      const orgId = this.state.user.orgId;
      if (orgId) {
        apiService.getOrgInfo(orgId).then((response) => {
          if (response.status === 200 && response.data) {
            this.setState({
              orgInfo: response.data
            })
            resolve();
          } else {
            reject();
          }
        }).catch((err) => {
          console.log(err);
          reject();
        })
      }
    })
  }

  setupAppArr() {
    const userRoles = authService.getUser().role;
    let appArr = JSON.parse(JSON.stringify(this.state.appArr));
    appArr = appArr.map((item) => {
      item.name = `${this.state.orgInfo.code}-${item.name}`;
      item.display = userRoles.some(item1 => {
        const regex = new RegExp("^" + item.name);
        return regex.test(item1);
      });
      return item;
    });
    this.setState({
      appArr: appArr
    });
  }

  handleLogoutEvent() {
    authService.logout();
  }

  render() {
    const setStyle = (bgUrl) => {
      return {
        backgroundImage: `url(${bgUrl})`,
      };
    };
    return (
      <div className={styles.homeCustom}>
        <div className={styles.navbarCustom}>
          <div className={styles.navbarInfo}>
            <div className={styles.navbarAvartar}>
              <img src={this.state.userLogo} alt="avartar"></img>
            </div>
            <div className={styles.navbarName}>
              {this.state.user.unique_name}
            </div>
          </div>
          <div className={styles.navbarBtn} onClick={() => {
            this.handleLogoutEvent();
          }}>
            <div><FontAwesomeIcon icon="sign-out-alt" /></div>
            <div>Log out</div>
          </div>
        </div>
        <div className={styles.orgContainer}>
          <div className={styles.orgLogoContainer}>
            <img src={this.state.orgInfo.logo || ''} alt="" />
          </div>
          <div className={styles.orgTitleContainer}>
            Hệ thống quản lý khách sạn {this.state.orgInfo.name}
          </div>
        </div>
        <div className={styles.homeContainer + " container"}>
          {this.state.appArr.map((item, index) => {
            return (
              item.display && (
                <a href={item.feUrl} key={index}>
                  <div style={setStyle(item.bgImgUrl)}></div>
                  <div>{item.nameAlt}</div>
                </a>
              )
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
