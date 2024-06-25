document.addEventListener("alpine:init", () => {
  Alpine.data("paramsHandler", () => ({
    el: null,
    async init() {
      this.el = this.$root;
      const url = "http://localhost:4999/files/params-map.csv";
      const csvData = await this.readCsv(url);
      for(const csvObj of csvData) {
        const [fieldname, value] = Object.entries(csvObj)[0];
        this.fillValue(fieldname, value)
      }

      const currentUrl = document.location.toString();
      const params = new URL(currentUrl).searchParams;
      for (const [fieldname, value] of params) {
        this.fillValue(fieldname, value);
      }
    },
    fillValue(fieldname, value) {
      const input = this.$root.querySelector(
        `[id="${fieldname}"]`
      );
      if (input) {
        switch (input.tagName) {
          case "SELECT":
            if(value) {
              const selectcontrol = input.closest('div');
              const listItem = selectcontrol?.querySelector('.select-items');
              const targetitem = [...listItem?.children || []].find(item => item.textContent === value);
              if(targetitem) {
                targetitem.click();
                selectcontrol.style.pointerEvents = 'none';
              }
            }
            break;
          case "TEXTAREA":
            if(value) {
              input.value = value;
              input.disabled = true;
            }
            break;
          default:
            switch (input.type) {
              case "text":
                if(value) {
                  input.value = value;
                  input.disabled = true;
                }
                break;
              case "checkbox":
                if (value && value !== "false") {
                  const label = this.el.querySelector(`[for="${fieldname}"]`);
                  label?.click();
                  input.disabled = true;
                }
                break;
              }
            break;
        }
      }
    },
    async readCsv(url) {
      const csvData = [];
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.text();
        const rows = data.split("\n").slice(1); // Skip the header row
        rows.forEach((row) => {
          if (row.trim()) {
            const cols = row
              .match(/(".*?"|[^",;\s]+)(?=\s*[;,]|\s*$)/g)
              .map((col) => col.replace(/["']/g, "").trim());
            const csvObj = { [cols[0]]: cols[1] };
            csvData.push(csvObj);
          }
        });
        return csvData;
      } catch (error) {
        console.error("Error fetching or parsing CSV file:", error);
      }
    },
  }));
});
