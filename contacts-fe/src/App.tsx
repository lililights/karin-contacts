import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPg from "./pages/contacts/ListPg";
import AddPg from "./pages/contacts/AddPg"
import DetailPg from "./pages/contacts/DetailPg";
import EditPg from "./pages/contacts/EditPg"
import './resources/Contacts.css'
import FormConextProvider from "./pages/contacts/components/FormConextProvider";
import CIdxContextProvider from "./pages/contacts/components/CIdxContextProvider";
import ListContextProvider from "./pages/contacts/components/ListContextProvider";
import SearchContextProvider from "./pages/contacts/components/SearchContextProvider";

const App = () => {
  return (
    <ListContextProvider>
      <SearchContextProvider>
        <CIdxContextProvider>
          <FormConextProvider>
            <BrowserRouter>
              <Routes>
                <Route path={'/*'} element={<ListPg />} />
                <Route path={'/detail'} element={<DetailPg />} />
                <Route path={'/add'} element={<AddPg />} />
                <Route path={'/edit/:version'} element={<EditPg />} />
              </Routes>
            </BrowserRouter>
          </FormConextProvider>
        </CIdxContextProvider >
      </SearchContextProvider>
    </ListContextProvider>
  )
}

export default App;