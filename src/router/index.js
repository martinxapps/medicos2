import { createRouter, createWebHistory } from "vue-router";


import IngresoMedicosView from "../views/IngresoMedicosView.vue";
import DashboardView from "../views/DashboardView.vue";
import ResultadosImagenLaboratorioMedicosView from "../views/ResultadosImagenLaboratorioMedicosView.vue";
import BusquedaResultadosImagenLaboratorioMedicosView
  from "../views/BusquedaResultadosImagenLaboratorioMedicosView.vue";
import LabResultView from "../views/LabResultView.vue";
import ShareLabResultView from "../views/ShareLabResultView.vue";
import ImageResultView from "../views/ImageResultView.vue";
import ShareImageResultView from "../views/ShareImageResultView.vue";
import CurvaView from "../views/CurvaView.vue";
import ZeroView from "../views/ZeroView.vue";
import ZeroItemView from "../views/ZeroItemView.vue";
import BuzonDeSugerenciasView from "../views/BuzonDeSugerenciasView.vue";
import MiPerfilMedicoView from "../views/MiPerfilMedicoView.vue";
import DetallePacienteView from "../views/DetallePacienteView.vue";
import MisPacientesView from "../views/MisPacientesView.vue";
import HonorariosView from "../views/HonorariosView.vue";
import HonorariosPayedInvoicesView from "../views/HonorariosPayedInvoicesView.vue";
import HonorariosPendingInvoicesView from "../views/HonorariosPendingInvoicesView.vue";
import HonorariosTransactionsView from "../views/HonorariosTransactionsView.vue";
import HonorariosAuditedView from "../views/HonorariosAuditedView.vue";
import HonorariosAccountStatementsView from "../views/HonorariosAccountStatementsView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import { useAuthStore } from "../stores/auth";
import { computed } from "vue";
import { medicAuthSetToken } from "../services/medicAuth";
import auth from "../services/auth";
import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();

let language = "es";
const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  routes: [
    // medicos
    //medic login
    // will match everything and put it under `$route.params.pathMatch`
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFoundView,
      meta: {
        authRequired: false,
        userType: "generic"
      }
    },
    {
      path: language === "es" ? "/ingreso" : "/login",
      name: "ingreso",
      component: IngresoMedicosView,
      meta: {
        authRequired: false,
        userType: "generic"
      }
    },
    // //mis pacientes
    {
      path: language === "es" ? "/mis-pacientes" : "/my-patients",
      name: "mis-pacientes",
      component: MisPacientesView,
      meta: {
        authRequired: true,
        userType: "medic",
        roles: ["PERFIL_MEDICO_PACIENTES", "PERFIL_MEDICO_RESIDENTES"]
      }
    },
    // //patient detail
    {
      path: language === "es" ? "/mis-pacientes/:nhc" : "/my-patients/:nhc",
      name: "detalle-paciente",
      component: DetallePacienteView,
      props: true,
      meta: {
        authRequired: true,
        userType: "medic",
        roles: ["PERFIL_MEDICO_PACIENTES", "PERFIL_MEDICO_RESIDENTES"]
      }
    },
    // patient zerofootprint view / medic
    {
      path: "/zerofootprint/:nhc",
      name: "medic-patient-zerofootprint-view",
      component: ZeroView,
      props: true,
      meta: {
        authRequired: true,
        userType: "medic",
        roles: ["PERFIL_MEDICO_PACIENTES", "PERFIL_MEDICO_RESIDENTES"]
      }
    },
    // patient zerofootprint view / medic
    {
      path: "/zerofootprint-item/:id",
      name: "medic-patient-zerofootprint-item-view",
      component: ZeroItemView,
      props: true,
      meta: {
        authRequired: true,
        userType: "medic",
        roles: ["PERFIL_MEDICO_PACIENTES", "PERFIL_MEDICO_RESIDENTES"]
      }
    },
    // patient graph view / medic
    {
      path: language === "es" ? "/mis-pacientes/:nhc/grafico-curva/:type/:na" : "/my-patients/:nhc/curve-graph/:type/:na",
      name: "medic-patient-curva-view",
      component: CurvaView,
      props: true,
      meta: {
        authRequired: true,
        userType: "medic",
        roles: ["PERFIL_MEDICO_PACIENTES", "PERFIL_MEDICO_RESIDENTES"]
      }
    },
    // patient lab result / medic
    {
      path: language === "es" ? "/mis-pacientes/:nhc/laboratorio/:url" : "/my-patients/:nhc/lab/:url",
      name: "medic-patient-lab-result-view",
      component: LabResultView,
      props: true,
      meta: {
        authRequired: true,
        userType: "medic",
        roles: ["PERFIL_MEDICO_PACIENTES", "PERFIL_MEDICO_RESIDENTES"]
      }
    },
    // patient image result / medic
    {
      path: language === "es" ? "/mis-pacientes/:nhc/imagen/:url" : "/mis-pacientes/:nhc/image/:url",
      name: "medic-patient-image-result-view",
      component: ImageResultView,
      props: true,
      meta: {
        authRequired: true,
        userType: "medic",
        roles: ["PERFIL_MEDICO_PACIENTES", "PERFIL_MEDICO_RESIDENTES"]
      }
    },
    // share lab result / medic
    {
      path: language === "es" ? "/compartir/:nhc/laboratorio/:url" : "/share/:nhc/lab/:url",
      name: "share-lab-result-view",
      component: ShareLabResultView,
      props: true,
      meta: {
        authRequired: false,
        userType: "generic",
        roles: []
      }
    },
    // share image result / medic
    {
      path: language === "es" ? "/compartir/:nhc/imagen/:url" : "/share/:nhc/image/:url",
      name: "share-image-result-view",
      component: ShareImageResultView,
      props: true,
      meta: {
        authRequired: false,
        userType: "generic",
        roles: []
      }
    },
    //patient results search / medic
    {
      path: language === "es" ? "/resultados-imagen-y-laboratorio-medicos" : "/image-and-lab-results-medic",
      name: "resultados-imagen-y-laboratorio-medicos",
      component: BusquedaResultadosImagenLaboratorioMedicosView,
      meta: {
        authRequired: true,
        userType: "medic",
        roles: ["PERFIL_MEDICO_RESULTADOS"]
      }
    },
    // //patients medic results
    {
      path: language === "es" ? "/resultados-imagen-y-laboratorio-medicos/:nhc" : "/image-and-lab-results-medic/:nhc",
      name: "resultados-paciente-imagen-y-laboratorio-medicos",
      component: ResultadosImagenLaboratorioMedicosView,
      props: true,
      meta: {
        authRequired: true,
        userType: "medic",
        roles: ["PERFIL_MEDICO_RESULTADOS"]
      }
    },
    // lab result search / medic
    {
      path: language === "es" ? "/resultados-imagen-y-laboratorio-medicos/:nhc/laboratorio/:url" : "/image-and-lab-results-medic/:nhc/lab/:url",
      name: "medic-lab-result-view",
      component: LabResultView,
      props: true,
      meta: {
        authRequired: true,
        userType: "medic",
        roles: ["PERFIL_MEDICO_RESULTADOS"]
      }
    },
    // image result search / medic
    {
      path: language === "es" ? "/resultados-imagen-y-laboratorio-medicos/:nhc/imagen/:url" : "/image-and-lab-results-medic/:nhc/image/:url",
      name: "medic-image-result-view",
      component: ImageResultView,
      props: true,
      meta: {
        authRequired: true,
        userType: "medic",
        roles: ["PERFIL_MEDICO_RESULTADOS"]
      }
    },
    //honorarios
    {
      path: language === "es" ? "/mis-honorarios" : "/my-fees",
      name: "honorarios",
      component: HonorariosView,
      meta: {
        authRequired: true,
        userType: "medic",
        roles: ["PERFIL_MEDICO_HONORARIOS"]
      }
    },
    // //honorarios facturas pagadas
    {
      path: language === "es" ? "/mis-honorarios/facturas-pagadas" : "/my-fees/payed-invoices",
      name: "honorarios-facturas-pagadas",
      component: HonorariosPayedInvoicesView,
      meta: {
        authRequired: true,
        userType: "medic",
        roles: ["PERFIL_MEDICO_HONORARIOS"]
      }
    },
    // //honorarios facturas pendientes
    {
      path: language === "es" ? "/mis-honorarios/facturas-pendientes" : "/my-fees/pending-invoices",
      name: "honorarios-facturas-pendientes",
      component: HonorariosPendingInvoicesView,
      meta: {
        authRequired: true,
        userType: "medic",
        roles: ["PERFIL_MEDICO_HONORARIOS"]
      }
    },
    // //honorarios transacciones
    {
      path: language === "es" ? "/mis-honorarios/transacciones" : "/my-fees/transactions",
      name: "honorarios-transacciones",
      component: HonorariosTransactionsView,
      meta: {
        authRequired: true,
        userType: "medic",
        roles: ["PERFIL_MEDICO_HONORARIOS"]
      }
    },
    // //honorarios auditados
    {
      path: language === "es" ? "/mis-honorarios/honorarios-auditados" : "/my-fees/audited-fees",
      name: "honorarios-auditados",
      component: HonorariosAuditedView,
      meta: {
        authRequired: true,
        userType: "medic",
        roles: ["PERFIL_MEDICO_HONORARIOS"]
      }
    },
    // honorarios estados de cuenta
    {
      path: language === "es" ? "/mis-honorarios/estados-de-cuenta" : "/my-fees/account-statements",
      name: "honorarios-estados-de-cuenta",
      component: HonorariosAccountStatementsView,
      meta: {
        authRequired: true,
        userType: "medic",
        roles: ["PERFIL_MEDICO_HONORARIOS"]
      }
    },
    // // my profie medic
    {
      path: language === "es" ? "/mi-perfil-medico" : "/my-profile-medic",
      name: "mi-perfil-medico",
      component: MiPerfilMedicoView,
      meta: {
        authRequired: true,
        userType: "medic",
        roles: []
      }
    },
    // //general
    // //dashboard
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
      meta: {
        authRequired: true,
        userType: "generic",
        roles: []
      }
    },
    // //buzon
    {
      path: language === "es" ? "/buzon-de-sugerencias" : "/suggestions-mailbox",
      name: "buzon-de-sugerencias",
      component: BuzonDeSugerenciasView,
      meta: {
        authRequired: false,
        userType: "generic",
        roles: []
      }
    }
  ]
});
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const user = computed(() => authStore.user);
  // console.log("user router", user.value);
  // console.log("storeToken router", storeToken.value);
  // console.log("userType router", userType.value);
  // console.log("to", to);
  // console.log("to.meta.authRequired", to.meta.authRequired);
  //const token = localStorage.getItem('metrovirtualToken');
  await auth.checkRedirect();
  const accounts = await auth.accounts();
  if (accounts.length > 0) {
    const newToken = await auth.acquireToken();
    //console.log("hay token, guardarlo y seguir", newToken);
    medicAuthSetToken(newToken);
    await authStore.setToken(newToken);
  }
  if (to.meta.authRequired) {
    console.log("auth es requerido");
    const token = localStorage.getItem('metrovirtualToken');
    if (token) {
      // const newToken = await auth.acquireToken();
      // //console.log("hay token, guardarlo y seguir", newToken);
      // medicAuthSetToken(newToken);
      if (!user.value) {
        //  si no hayuser actualizo
        let newUser = await auth.user();
        await authStore.setUser(newUser);

      }
      //valido roles para acceso
      let requiredRoles = to.meta.roles;
      // console.log('required roles', requiredRoles);
      let authRoles = user.value.idTokenClaims?.roles;
      // console.log('authRoles', authRoles);
      if (requiredRoles.length < 1) {
        next();
      } else {
        if (authRoles?.some(elem => requiredRoles.includes(elem))) {
          next();
        } else {
          notify({
            title: "No tienes acceso a esta sección",
            text: "Consulta con el administrador del sistema para que asigne los permisos necesarios",
            type: "error"
          });
          next({
            name: "dashboard"
          });
        }
      }

    } else {
      //console.log("no hay token, volver a login", token);
      next({
        name: "ingreso"
      });
    }
  } else {
    if (to.name === "ingreso") {
      const token = localStorage.getItem("metrovirtualToken");
      if (token) {
        next({
          name: "dashboard"
        });
      }
    }
    console.log("auth no es requerido");
    next();
  }
});

export default router;
