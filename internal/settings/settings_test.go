package settings

import (
	"os"
	"path"
	"testing"

	"github.com/stretchr/testify/require"
	"github.com/yohamta/dagu/internal/utils"
)

var testHomeDir string

func TestMain(m *testing.M) {
	testHomeDir = utils.MustTempDir("settings_test")
	ChangeHomeDir(testHomeDir)
	exitCode := m.Run()
	os.RemoveAll(testHomeDir)
	os.Exit(exitCode)
}

func TestReadSetting(t *testing.T) {
	load()

	// read default settings
	for _, test := range []struct {
		Name string
		Want string
	}{
		{
			Name: SETTING__DATA_DIR,
			Want: path.Join(testHomeDir, ".dagu/data"),
		},
		{
			Name: SETTING__LOGS_DIR,
			Want: path.Join(testHomeDir, ".dagu/logs"),
		},
	} {
		val, err := Get(test.Name)
		require.NoError(t, err)
		require.Equal(t, val, test.Want)
	}

	// read from enviroment variables
	for _, test := range []struct {
		Name string
		Want string
	}{
		{
			Name: SETTING__DATA_DIR,
			Want: "/home/dagu/data",
		},
		{
			Name: SETTING__LOGS_DIR,
			Want: "/home/dagu/logs",
		},
	} {
		_ = os.Setenv(test.Name, test.Want)
		load()

		val, err := Get(test.Name)
		require.NoError(t, err)
		require.Equal(t, val, test.Want)

		val = MustGet(test.Name)
		require.Equal(t, val, test.Want)
	}

	_, err := Get("Invalid_Name")
	require.Equal(t, ErrSettingNotFound, err)
}
