import Button from '@mui/material/Button';
import styles from '../styles/Parameter.module.scss';
import ParameterModel from "../model/ParameterModel";
import TextInput from "./TextInput";
import {useEffect, useState} from "react";
import {auth} from '../firebase';
import axios from 'axios';
import moment from "moment";
import ConfigurationSettingsService from "../services/ConfigurationSettingsService";

const Parameter = ({parameter, deleteParameter, refreshParameterList, loadingCallback}: { parameter: ParameterModel, deleteParameter: (id: string) => void, refreshParameterList : () => void, loadingCallback : (isLoading: boolean) => void}) => {

    const [parameterKey, setParameterKey] = useState(parameter.parameter_key);
    const [value, setValue] = useState(parameter.value);
    const [description, setDescription] = useState(parameter.description);
    const [editModeOpen, setEditModeOpen] = useState(false);

    const openEditMode = () => {
        setEditModeOpen(true);
    }

    const updateParameter = () => {

        if(parameterKey && value && description){
            loadingCallback(true)
            let date_create = moment().format("DD/MM/YYYY hh:mm")

            let data = {
                id: parameter.id,
                parameter: {
                    parameter_key: parameterKey,
                    value: value,
                    description: description,
                    create_date: date_create
                }
            };

            auth.currentUser?.getIdToken().then(token => {
                ConfigurationSettingsService.updateParameter(token, data.id, data.parameter).then(response => {
                    refreshParameterList();
                    setEditModeOpen(false);
                }).catch((e) => {
                    loadingCallback(false)
                    alert(e)
                })
            }).catch((e) => {
                loadingCallback(false)
                alert(e)
            })
        }
    }

    const cancelUpdateParameter = () => {
        setEditModeOpen(false);
        setParameterKey(parameter.parameter_key);
        setValue(parameter.value);
        setDescription(parameter.description);
    }

    return (
        <div>
            {!editModeOpen && <div className={styles.parameter}>
                <div className={styles.text + " main_font"}><div className={styles.mobile_title + " main_font"}>Parameter Key: </div>{parameter.parameter_key}</div>
                <div className={styles.text + " main_font"}><div className={styles.mobile_title + " main_font"}>Value: </div>{parameter.value}</div>
                <div className={styles.text + " main_font"}><div className={styles.mobile_title + " main_font"}>Description: </div>{parameter.description}</div>
                <div className={styles.text + " main_font"}><div className={styles.mobile_title + " main_font"}>Create Date: </div>{parameter.create_date}</div>
                <div className={styles.buttons}>
                    <button className={styles.button_blue} onClick={openEditMode}>Edit</button>
                    <button className={styles.button_red} onClick={() => deleteParameter(parameter.id)}>Delete</button>
                </div>
            </div>}

            {editModeOpen && <div className={styles.parameter}>
                <label className={styles.mobile_title + " main_font"}>Parameter:</label>
                <TextInput className={styles.input + " main_font"} value={parameterKey}
                           onChangeCallback={text => setParameterKey(text)} placeholder={"New Parameter"}/>
                <label className={styles.mobile_title + " main_font"}>Value:</label>
                <TextInput className={styles.input + " main_font"} value={value} placeholder={"New Value"}
                           onChangeCallback={text => setValue(text)}/>
                <label className={styles.mobile_title + " main_font"}>Description:</label>
                <TextInput className={styles.input + " main_font"} value={description}
                           placeholder={"New Description"} onChangeCallback={text => setDescription(text)}/>
                <div className={styles.text + " main_font"}>{parameter.create_date}</div>
                <div className={styles.buttons}>
                    <button className={styles.button_blue} onClick={updateParameter}>Apply</button>
                    <button className={styles.button_red} onClick={cancelUpdateParameter}>Cancel</button>
                </div>
            </div>}
        </div>
    );
}

export default Parameter;