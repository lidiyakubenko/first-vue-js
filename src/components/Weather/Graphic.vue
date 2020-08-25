<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    chartdata: Object
  },
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
};
</script>
