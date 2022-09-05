// @ts-ignore
import React from "react";

/*
          executeQuery={window.executeQuery}
          openApp={window.openApp}
          openLevel={window.openLevel}
          refreshDetails={window.refreshDetails}
          Params={window.param}
*/

/*-------------------------------Metodos Nativos Dashboard------------------------*/
//Metodo para execução de queries via JavaScript
//executeQuery(query:String, parameters:Array, onSuccess:Function, onError:Function)

//Metodo para abrir outras telas dentro do SankhyaW
//OBS: Ao abrir a tela de Parceiros (versão Flex), os dados do registro não são carregados, mas a mesma tela na versão HTML5 é aberta conforme esperado.
//openApp(resourceID:String, params:Object)

//Metodo para abrir outro nivel dentro do dashboard
//openLevel(nivel:String, params:Object)

//Metodo para atualizar componente detalhe
//refreshDetails(componentID:String, params:Object)

//Metodo para abrir paginas externas ao SankhyaW
//openPage(page:String, params:Object)

//Exemplo de formato do argumento "params": {CODPARC: parseInt('${CODPARC}')}

/*-------------------------------DHTESTE : Data/Hora-------------------------------*/
//var arr = [{value:"${DHTESTE}", type:"D"}];
//var query1 = "SELECT * FROM TGFPAR WHERE DTALTER >= ?";

/*-------------------------------DTALTER : Data------------------------------------*/
//var arr = [{value:"${DTALTER}", type:"D"}];
//var query1 = "SELECT * FROM TGFPAR WHERE DTALTER >= ?";

/*-------------------------------MULTSQLTESTE : multiList:Text---------------------*/
//**quando nenhum item é selecionado, serão enviados todos os registros, então para utilizacao fixa na query, este parametro e obrigatorio
//var arr = [{value:"${MULTSQLTESTE}", type:"IN"}];
//var query1 = 'SELECT * FROM TGFPAR WHERE CODPARC IN (?)';
//var query1 = 'SELECT * FROM TGFPAR WHERE CODPARC NOT IN (?)';

/*-------------------------------PERTESTE: Periodo---------------------------------*/
//var query1 = "SELECT * FROM TGFPAR WHERE DTALTER >= ? AND DTALTER <= ?";
//var arr = [{value: "${PERTESTE.INI}", type:"D"}, {value: "${PERTESTE.FIN}", type:"D"}];

/*-------------------------------CODPARC : Entidade/Tabela-------------------------*/
//var arr = [{value:"${CODPARC}", type:"I"}];
//var query1 = "SELECT * FROM TGFPAR WHERE CODPARC = ?";

/*-------------------------------RAZAOSOCIAL : Texto-------------------------------*/
//var arr = [{value:"${RAZAOSOCIAL}", type:"S"}];
//var query1 = "SELECT * FROM TGFPAR WHERE RAZAOSOCIAL = ?";

/*-------------------------------SINGSQLTESTE : singleList:Text--------------------*/
//var arr = [{value:"${SINGSQLTESTE}", type:"I"}];
//var query1 = "SELECT * FROM TGFPAR WHERE CODPARC = ?";

type queryParams = { value: string; type: "D" | "I" | "S" | "IN" }[];
interface Props {
  executeQuery: (
    query: string,
    arr: queryParams,
    onSuccess: (result: string) => void,
    onError: (result: string) => void
  ) => void;
  openApp: (resourceID: string, params?: object) => void;
  openLevel: (nivel: string, params?: object) => void;
  refreshDetails: (componentID: string, params?: object) => void;
  openPage: (page: string, params?: object) => void;
}
type template = () => JSX.Element;

const template = (props) => {
  const { executeQuery, openApp, refreshDetails, openLevel, openPage } = props;
  return <div>template</div>;
};

export default template;

//  regesx tags: (<.[^(><.)]+>)
// nome função+props: (template\(({([A-Za-z]:[A-Za-z])})\))
// Props: (\(({([A-Za-z]:[A-Za-z])})\))
// "template: (template)
