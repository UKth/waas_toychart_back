import express from 'express';
import {getScore, setScore} from '../controller/score';

const Router = express.Router();

Router.get('/score', (req, res) => {
    // 어떤 area인지 parameter에서 담아서 처리
    try {
        const score = await getScore(0);
        if(typeof score === 'number') {
            return res.status(200).json({score: score});
        }
        else {
            // error reason 처리 필요, setScore에서 reason을 돌려줄 것
            return res.status(400).json({success: false, reason: "unknown"});
        }
    } catch(err) {
        res.status(500).json({success: false, reason: err});
    }
});

// put의 경우 대상이 static하게 정해져 있을 때 변경하는 경우
// post의 경우 대상이 static하게 정해져 있지 않거나 추가하는 경우
Router.put('/score', (req, res) => {
    // 어떤 area인지 parameter에서 담아서 처리
    try {
        const ask = await setScore(0, 1, 0);
        if(ask === true) {
            return res.status(200).json({success: true});
        }
        else {
            // error reason 처리 필요, setScore에서 reason을 돌려줄 것
            return res.status(400).json({success: false, reason: "unknown"});
        }
    } catch(err) {
        return res.status(500).json({success: false, reason: err});
    }
});

