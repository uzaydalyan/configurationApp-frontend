import {useEffect, useRef, useState} from 'react';
import styles from '../styles/ParameterList.module.scss';
import Parameter from "./Parameter";
import {Button, FormControl, FormControlTypeMap, TextField} from "@mui/material";
import axios from 'axios';
import moment from "moment";
import {auth} from '../firebase';
import ParameterModel from '../model/ParameterModel'
import TextInput from "./TextInput";
import LoadingSpinner from "./LoadingSpinner";
import ConfigurationSettingsService from "../services/ConfigurationSettingsService";

const ParameterList = ({loadingCallback}: { loadingCallback: (isLoading: boolean) => void }) => {

    const [newParameterKey, setNewParameterKey] = useState("");
    const [newValue, setNewValue] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [parameterList, setParameterList] = useState<ParameterModel[]>([]);

    const fetchParameters = () => {
        loadingCallback(true)
        setParameterList([]);

        auth.currentUser?.getIdToken().then(token => {
            ConfigurationSettingsService.getAllParameters(token).then(response => {
                let parameters: ParameterModel[] = []
                response.data.parameterList.forEach((parameter: {
                    id: string,
                    parameter_key: string;
                    value: string;
                    create_date: string;
                    description: string;
                }) => parameters.push({
                    id: parameter.id,
                    parameter_key: parameter.parameter_key,
                    value: parameter.value,
                    create_date: parameter.create_date,
                    description: parameter.description
                }))
                setParameterList(parameters)
                loadingCallback(false)

            }).catch((e) => {
                alert(e)
                loadingCallback(false)
            })
        }).catch((e) => {
            alert(e)
            loadingCallback(false)
        })
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                fetchParameters();
            }
        })

    }, []);


    const handleSubmit = () => {

        if (newParameterKey && newValue && newDescription) {
            loadingCallback(true)
            let date_create = moment().format("DD/MM/YYYY hh:mm")

            let data = {
                parameter_key: newParameterKey,
                value: newValue,
                description: newDescription,
                create_date: date_create
            };

            auth.currentUser?.getIdToken().then(token => {
                ConfigurationSettingsService.createParameter(token, data).then(response => {
                    setNewValue("")
                    setNewDescription("")
                    setNewParameterKey("")
                    fetchParameters();
                }).catch((e) => {
                    alert(e)
                    loadingCallback(false)
                })
            }).catch((e) => {
                alert(e)
                loadingCallback(false)
            })
        }
    }

    const deleteParameter = (id: string) => {
        loadingCallback(true)
        auth.currentUser?.getIdToken()
            .then(token => {
                ConfigurationSettingsService.deleteParameter(token, id).then(response => {
                    fetchParameters()
                    loadingCallback(false)
                }).catch(e => {
                    loadingCallback(false)
                    alert(e)
                })
            })
    }


    return (
        <div className={styles.parameter_list}>
            <div className={styles.titles}>
                <div className={'title_font ' + styles.title}>Parameter Key</div>
                <div className={'title_font ' + styles.title}>Value</div>
                <div className={'title_font ' + styles.title}>Description</div>
                <div className={'title_font ' + styles.title}>Create Date</div>
            </div>

            <div className={styles.list}>
                {parameterList.map((parameter, i) => <Parameter deleteParameter={deleteParameter} key={i.toString()}
                                                                parameter={parameter}
                                                                refreshParameterList={fetchParameters}
                                                                loadingCallback={loadingCallback}/>)}

                <div className={styles.form}>
                    <TextInput className={styles.input} value={newParameterKey} onChangeCallback={e => setNewParameterKey(e)} type="text"
                               placeholder="New Parameter"/>
                    <TextInput className={styles.input} value={newValue} onChangeCallback={e => setNewValue(e)} type="text"
                               placeholder="New Value"/>
                    <TextInput className={styles.input + " " + styles.form_description} value={newDescription}
                               onChangeCallback={e => setNewDescription(e)} type="text" placeholder="New Description"/>
                    <button className={styles.form_button} onClick={handleSubmit}>ADD</button>
                </div>
            </div>
        </div>
    );
}

export default ParameterList;