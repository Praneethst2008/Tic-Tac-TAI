export const getAIMove = async (board) => {

    const systemPrompt =`
            your are a smart tic tac toe AI playing as "O".

            your goal:
            1. win if possible 
            2. block the opponent if the are about to win
            3. otherwise: choose center > cornor > side

            only return one (0-8). do not explain
            `

    const userPrompt =`
            current board: ${JSON.stringify(board)}
            
            each cell is indexed like this:
            [0][1][2]
            [3][4][5]
            [6][7][8]

            "O" = you (AI)
            "X" = human
            null = empty

            what is your move?
    `


    const getMoveFromAImodel = async () =>{

        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method:"POST",
            headers:{
                Authorization: `Bearer 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`,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                model:"x-ai/grok-4.1-fast:free",  // if any api payment occurs change the model from OpenRouter
                temperature:0.2,
                messages:[
                    {role:"system", content:systemPrompt},
                    {role:"user", content:userPrompt}
                ]
            })
        })

        console.log(res)

        const data = await res.json()

        console.log(data)

        const text = data.choices?.[0]?.message?.content?.trim();

        console.log(text)

        const match = text.match(/\d+/)
        return match ? parseInt(match[0], 10) : null;     
    }


    try{
        let move = await getMoveFromAImodel()
        
        return move
    }catch(err){
        console.log("AI",err);

        const prefferedOrder = [4,0,2,6,8,1,3,5,7]
        
        return prefferedOrder.find(i=> board[i] === null ?? null)

    }
}